#!/bin/bash

base_url="http://133.242.233.150:10080"
url="${base_url}/1.0/helper"

curl -X POST \
-d "name=高山 篤史" \
-d "addr=〒220-0072 横浜市西区浅間町1-1-32" \
-d "tel=080-4296-0000" \
-d "mail=takayama@softbank.ne.jp" \
-d "location=35.463864,139.612187" \
-d "birthday=19760217" \
-d "comment=農業がすき" \
-d "imageURL=${base_url}/uploaded_images/photo03.jpg" \
$url

curl -X POST \
-d "name=高橋 聡" \
-d "addr=〒221-0088 横浜市戸塚区東戸塚3-2-2" \
-d "tel=080-9132-0000" \
-d "mail=takahashi@gmail.com" \
-d "location=35.463864,139.612187" \
-d "birthday=19690831" \
-d "comment=よろしくお願いします" \
-d "imageURL=${base_url}/uploaded_images/2013to-masters-011.jpg" \
$url

curl -X POST \
-d "name=由美 かおる" \
-d "addr=〒150-0001 東京都渋谷区千駄ヶ谷4-2" \
-d "tel=03-6866-3311" \
-d "mail=yk2014s@yahoo.co.jp" \
-d "location=35.463864,139.612187" \
-d "birthday=19931221" \
-d "comment=家事がとくいです" \
-d "imageURL=${base_url}/uploaded_images/photo1.jpg" \
$url
