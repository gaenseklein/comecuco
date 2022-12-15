#/usr/bin/bash

echo "[" > todosjuntos.json

for f in archive/nodes/*; do
    cat $f >> todosjuntos.json
    echo "," >> todosjuntos.json
done

echo "]" >> todosjuntos.json
