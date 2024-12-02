import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, roc_auc_score
from sklearn.model_selection import train_test_split
import matplotlib.pyplot as plt

def load_data():
    data = pd.read_csv('models\\training-data\\400_transactions.csv')
    return data

def random_forest(X_training_data, y_training_data, X_test, y_test):
    rf_model = RandomForestClassifier(n_estimators=100, random_state=42)
    rf_model.fit(X_training_data, y_training_data)
    y_pred = rf_model.predict(X_test)
    y_prob = rf_model.predict_proba(X_test)[:, 1]
    print("Classification Report:")
    print(classification_report(y_test, y_pred))

    roc_auc = roc_auc_score(y_test, y_prob)
    print(f"ROC-AUC Score: {roc_auc:.2f}")

    return rf_model


def pre_processing(df):
    df.columns = df.columns.str.strip()
    df['PURCHASE_DATE'] = pd.to_datetime(df['PURCHASE_DATE'])

    customer_data = df.groupby('HSHD_NUM').agg(
        purchase_count=('PURCHASE_DATE', 'count'),
        last_purchase=('PURCHASE_DATE', 'max'),
        first_purchase=('PURCHASE_DATE', 'min'),
    ).reset_index()
    
    max_date = df['PURCHASE_DATE'].max() 
    customer_data['recency'] = (max_date - customer_data['last_purchase']).dt.days
    customer_data['frequency'] = customer_data['purchase_count'] / (
        ((max_date - customer_data['first_purchase']).dt.days / 30) + 1e-6
    )

    customer_data['churn'] = (customer_data['recency'] > 90).astype(int)
    
    X = customer_data[['recency', 'frequency', 'purchase_count']]
    y = customer_data['churn']
    X, y = X[y.notna()], y[y.notna()]

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)
    return X_train, X_test, y_train, y_test, customer_data, X



data_frame = load_data()
X_train, X_test, y_train, y_test, customer_data, X = pre_processing(data_frame)
model = random_forest(X_train, y_train, X_test, y_test)
customer_data['predicted_churn'] = model.predict_proba(X)[:, 1]
customer_data[['HSHD_NUM', 'predicted_churn']].to_csv('models\\predicted_churn.csv', index=False)
