#!/bin/bash
for i in `seq 1 128`;
do
	fileName="$i.jpeg"
	wget "http://stripovionline.com/AlanFord/0404_Zimske_radosti/$fileName" --header='Host: stripovionline.com' \
	--header='Connection: keep-alive' \
	--header='Accept: image/webp,*/*;q=0.8' \
	--header='User-Agent: Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.125 Safari/537.36' \
	--header='Referer: http://stripovionline.com/AlanFord/0402_Perestrojka/4.html' \
	--header='Accept-Encoding: gzip,deflate,sdch' \
	--header='Accept-Language: en-US,en;q=0.8' \
	--header='Cookie: PHPSESSID=3mu6ga9loffi4skmamkd1kgai5'

	threeDigits=$(printf "%03d" $i)
	mv $fileName "$threeDigits.jpeg"
done
