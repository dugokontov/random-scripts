#!/bin/bash
rm -f proba.xml
touch proba.xml
for i in `seq 1 30`;
do
    twoDigits=$(printf "%02d" $i)
    date="09/$twoDigits/2015"
    rm -f tmp.xml
    curl --data "service=getExchngRateDetails&baseCurrency=USD&settlementDate=$date" https://www.mastercard.com/psder/eu/callPsder.do -o tmp.xml
    echo "$date" >> proba.xml
    grep -oP 'convertible marka<\/CURRENCY_NAME><CONVERSION_RATE>\K[\d\.]+' tmp.xml >> proba.xml
done
