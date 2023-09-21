---
title: Regression In Machine Learning
date: "2023-08-16"
description: "Regression models application in machine learning"
mainPage: false
---

Regression models `linear` and `non-linear` are used for predicting a real unknown values by set of known similar values. 

## Types Of Regression Models

- Simple Linear Regression

Ordinary list squares - is a method allowing to find best linear regression approximation between all other possible.

- Multiple Linear Regression
- Polynomial Regression
- Support Vector for Regression (SVR)
- Decision Tree Regression
- Random Forest Regression

## Assumptions Of Linear Regression

Linear regression fit not every scenario. Before applying it, need to test some assumptions on our data set, which will allow 
to understand if it is suitable.

- There should be approximate linear relation between dependent and independent parameters.
- Homoscedasticity - there should not be a cone shape of dataset distribution
- There should be a normal distribution of our dataset
- Independence of dataset. Which means that each value in our dataset does not depend on any characteristic of other values 
  in this dataset
- Coefficients should not correlate to each other
- Absence of outliers

## Categorical Data

To represent categorical data each discreet value of category split into separate coefficient with value 1 if it is a value of
this category and 0 otherwise.

**Dummy variable trap** - important to note that there should be always n-1 coefficient if there is n discreet values of
categorical value. Otherwise model will work unreliably. 

## Logistic Regression

Allows to predict categorical values. Usually `yes` or `no` and their likelihood. For example predict whether customer with
given characteristics will buy or not.
