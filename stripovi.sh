#!/bin/bash
comicHero="AlanFord"
comicName="0011_Zalosna_prica_o_mladom_bogatasu"
mkdir $comicName
for i in `seq 1 100`;
do
	fileName="$i.jpeg"
	wget "http://stripovionline.com/$comicHero/$comicName/$fileName" --header='Host: stripovionline.com' \
	--header='Connection: keep-alive' \
	--header='Accept: image/webp,*/*;q=0.8' \
	--header='User-Agent: Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.125 Safari/537.36' \
	--header='Referer: http://stripovionline.com/$comicHero/$comicName/4.html' \
	--header='Accept-Encoding: gzip,deflate,sdch' \
	--header='Accept-Language: en-US,en;q=0.8' \
	--header='Cookie: PHPSESSID=3mu6ga9loffi4skmamkd1kgai5'

	threeDigits=$(printf "%03d" $i)
	mv $fileName "$comicName/$threeDigits.jpeg"
done
