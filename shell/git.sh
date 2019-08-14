#! /bin/sh

echo "================start"
# echo -n "分支名称: $@"
# msg=$2
# echo $1
# echo $2

# if [ -n "${msg}" ]; then
#     cd $1 && ls
#     git add .
#     git commit -m "${msg}"
#     git pull
#     # git status
#     git push
#     echo "本地提交完成"
# else
#     "添加注释"
# fi
echo "$@"
# echo "$0"
echo "$1"
echo "$2"
echo "--------==>"

path=$1
msg=$2
echo "path: ${path}"
echo "msg: ${msg}"
echo "--------==>"
# cd ${path} && ls
cd ${path}
echo "进入${path}"
echo "--------==>"

git add .
git commit -m "${msg}"
echo "文件已暂存"
echo "--------==>>"

git pull --rebase
echo "拉取文件并变基"
echo "--------==>>"

git push
echo "推送文件到远程"
echo "--------==>>"

echo "============>>>>end"