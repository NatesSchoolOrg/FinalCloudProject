from pyspark.sql import SparkSession
from pyspark.ml.fpm import FPGrowth
import pandas as pd
from mlxtend.frequent_patterns import apriori
from mlxtend.frequent_patterns import association_rules
# from sklearn.model_selection import train_test_split
# from sklearn.model_selection import GradientBoosting
# from sklearn.metrics import mean_squared_error, r2_score


def load_data():
    data = pd.read_csv('models\\training-data\\400_transactions.csv')
    return data

def encode_data(data):
    transaction_df = pd.crosstab(data['BASKET_NUM'], data['PRODUCT_NUM'])
    transaction_df = transaction_df.applymap(lambda x: 1 if x > 0 else 0)
    return transaction_df

def recommend_items(item, association_rules):
    recommendations = association_rules.filter(association_rules['antecedent'].contains(item)).select('consequent', 'confidence', 'lift').collect()
    recommendations.show()
    
if __name__ == '__main__':
    data = load_data()
    data = encode_data(data)
    spark = SparkSession.builder.appName("FrequentPatternMining").getOrCreate()
    
    transactions = data.apply(lambda row: row[row == 1].index.tolist(), axis=1).tolist()
    
    spark_df = spark.createDataFrame([(row,) for row in transactions], ["items"])
    
    fp_growth = FPGrowth(itemsCol="items", minSupport=0.001, minConfidence=0.01)
    model = fp_growth.fit(spark_df)
    #model.save("models\\fpgrowth_model")

    frequent_itemsets = model.freqItemsets
    frequent_itemsets_sorted = frequent_itemsets.orderBy("freq", ascending=False)
    frequent_itemsets_sorted.show()

    association_rules = model.associationRules
    association_rules.show()
    spark.stop()
