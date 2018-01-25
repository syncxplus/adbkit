# Build #
```
docker build . -t adbkit:1.0
```
# Run #
```
docker run -d --rm --name adbkit --net host -e PUBLIC_PORT=8080 registry.aliyuncs.com/syncxplus/adbkit:1.0
docker run -d --rm --name adbkit -p 80:80 -p '1300-1350:1300-1350' registry.aliyuncs.com/syncxplus/adbkit:1.0
```
>  
> You cannot use the --restart option `such as: --restart=always` with --rm option.
>  
> Before v17.06, you cannot use the --rm option with -d option.
# ENV #
 name | default value 
----- | -------------- 
 PUBLIC_PORT | 80 
 ADB_SERVER_HOST | 127.0.0.1 
 ADB_SERVER_PORT | 5037
