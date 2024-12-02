from pyspark.sql import SparkSession
from pyspark.ml.fpm import FPGrowth
from pyspark.sql.functions import size
import pandas as pd

def load_data():
    data = pd.read_csv('models\\training-data\\400_transactions.csv')
    data = data[['BASKET_NUM', 'PRODUCT_NUM']]
    data['PRODUCT_NUM'] = pd.to_numeric(data['PRODUCT_NUM'], errors='coerce')
    return data

def encode_data(data):
    transaction_df = pd.crosstab(data['BASKET_NUM'], data['PRODUCT_NUM'])
    transaction_df = transaction_df.map(lambda x: 1 if x > 0 else 0)
    return transaction_df

def recommend_items(item, association_rules):
    recommendations = association_rules.filter(association_rules['antecedent'].contains(item)).select('consequent', 'confidence', 'lift').collect()
    recommendations.show()

def generate_frequent_itemsets_dataset(model, output_file="models\\frequent_itemsets.csv"):
    frequent_itemsets = model.freqItemsets

    frequent_itemsets = frequent_itemsets.withColumn("size", size(frequent_itemsets["items"]))

    frequent_itemsets_filtered = frequent_itemsets.filter(
        (frequent_itemsets["size"] >= 2) & (frequent_itemsets["size"] <= 3)
    )

    frequent_itemsets_pandas = frequent_itemsets_filtered.toPandas()

    frequent_itemsets_pandas.to_csv(output_file, index=False)
    print(f"Frequent itemsets saved to {output_file}")
    
if __name__ == '__main__':
    data = load_data()
    transaction_df = encode_data(data)
    item_counts = transaction_df.sum(axis=0)
    common_items = item_counts[item_counts.between(10, 500)].index
    filtered_data = transaction_df[common_items]

    transactions = filtered_data.apply(lambda row: row[row == 1].index.tolist(), axis=1).tolist()
    spark = SparkSession.builder.appName("FrequentPatternMining").getOrCreate()
    spark_df = spark.createDataFrame([(transaction,) for transaction in transactions], ["items"])

    fp_growth = FPGrowth(itemsCol="items", minSupport=0.001, minConfidence=0.05)
    model = fp_growth.fit(spark_df)

    generate_frequent_itemsets_dataset(model)

    frequent_itemsets = model.freqItemsets
    frequent_itemsets_sorted = frequent_itemsets.orderBy("freq", ascending=False)
    frequent_itemsets_sorted.show()

    association_rules = model.associationRules
    association_rules.show()

    spark.stop()
