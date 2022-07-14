#!/bin/sh

a=1

while [ $a -lt 40 ]
do
   echo $a
   wget http://comecuco.org/api-noticia?page=$a
   a=`expr $a + 1`
done
