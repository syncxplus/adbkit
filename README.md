# Build #
```
docker build . -t adbkit:1.0
```
# Run #
```
docker run --rm --name adbkit -p 8080:8080 -p '1300-1400:1300-1400' registry.aliyuncs.com/syncxplus/adbkit:1.0
```
# ENV #
 name | default value 
----- | -------------- 
 PUBLIC_PORT | 8080 
 ADB_SERVER_HOST | 127.0.0.1 
 ADB_SERVER_PORT | 5037
