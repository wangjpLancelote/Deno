# 基于nginx:latest镜像构建
FROM nginx
# 将项目根目录下dist文件夹下的所有文件复制到镜像中 /usr/share/nginx/html/ 目录下 采用动态挂载的方式，应对经常改变的文件。
# /Users/wangjianping/Deno/vue-repo 宿主地址
COPY dist/ /usr/share/nginx/html/
# 将nginx目录下的default.conf 复制到 /etc/nginx/conf.d/default.conf， 用本地的conf文件替换nginx镜像里的默认配置
COPY nginx/default.conf /etc/nginx/conf.d/default.conf