#!/bin/bash

url="http://133.242.233.150:10080/1.0/farmer"

curl -X POST \
-d "name=山田農場" \
-d "addr=〒030-8570 青森市長島0丁目0番0号" \
-d "tel=017-734-0000" \
-d "location=40.84706035607122,140.943603515625" \
-d "products=野菜" \
-d "comment=採れたて野菜をどうぞ" \
$url

curl -X POST \
-d "name=佐藤太郎" \
-d "addr=〒030-8570 青森市長島0丁目0番0号" \
-d "tel=017-734-0000" \
-d "location=40.65147128144057,140.07568359375" \
-d "products=野菜" \
-d "comment=" \
$url

curl -X POST \
-d "name=田中次郎 果樹園" \
-d "addr=〒030-8570 青森市長島0丁目0番0号" \
-d "tel=017-734-0000" \
-d "location=41.03793062246529,140.4766845703125" \
-d "products=りんご果樹園" \
-d "comment=採れたて野菜をどうぞ" \
$url

curl -X POST \
-d "name=高橋三郎" \
-d "addr=〒030-8570 青森市長島0丁目0番0号" \
-d "tel=017-734-0000" \
-d "location=40.463666324587685,140.6634521484375" \
-d "products=米" \
-d "comment=種まき体験してみませんか？" \
$url

curl -X POST \
-d "name=加藤史郎" \
-d "addr=〒030-8570 青森市長島0丁目0番0号" \
-d "tel=017-734-0000" \
-d "location=40.325607999732064,141.0040283203125" \
-d "products=野菜" \
-d "comment=採れたて野菜にふれてみませんか？" \
$url

curl -X POST \
-d "name=山本悟朗" \
-d "addr=〒030-8570 青森市長島0丁目0番0号" \
-d "tel=017-734-0000" \
-d "location=39.37252570201878,141.317138671875" \
-d "products=米" \
-d "comment=一緒に米作しましょう！" \
$url

curl -X POST \
-d "name=大林果樹園" \
-d "addr=〒030-8570 青森市長島0丁目0番0号" \
-d "tel=017-734-0000" \
-d "location=39.276492485539396,140.130615234375" \
-d "products=いちご、さくらんぼ" \
-d "comment=さくらんぼ食べ放題" \
$url

curl -X POST \
-d "name=岩沼みんなの家" \
-d "addr=〒989-2423 宮城県岩沼市押分字南谷地24-1" \
-d "tel=080-6583-9732" \
-d "location=38.10999523930112,140.90562343597412" \
-d "products=野菜" \
-d "comment=農業復興支援活動に取り組んでいます" \
$url
