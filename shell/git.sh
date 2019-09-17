#! /bin/sh


# Author : Created by W.J.P
# Describtion : this script functio is for devops git deploy
# Version 1.0.0
# Date 2019-8-14

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
echo `date` + "%H:%M:%S"

def_valid_param () {
    local msg = ""
    if [ ! -n"$1" ]; then
        echo "!!!!!!请输入必要参数!!!!!!"
        exit
    elif [ ! -n"$2" ]; then
        echo "this si default message 4 commit please edit nextTime and remember"
        msg="this si default message 4 commit please edit nextTime and remember"
    else
        echo "do"
        msg=$2
    fi
}

# def_valid_param()
if [ ! -n"$1" ]; then
    echo "!!!!!!请输入必要参数!!!!!!"
    exit
elif [ ! -n"$2" ]; then
    echo "this si default message 4 commit please edit nextTime and remember"
    msg="this si default message 4 commit please edit nextTime and remember"
else
    echo "do"
    msg=$2
fi
path=$1
msg=$2


echo "path: ${path}"
echo "msg: ${msg}"
echo "--------==>"

read -p 'please press any key to continue'
sleep 1
# cd ${path} && ls
cd ${path}
echo "进入${path}"
echo "--------==>"

git add .
git commit -m "${msg}"
echo "文件已暂存"
echo "--------==>>"

git pull --rebase
echo "拉取文件并变基到当前分支"
echo "--------==>>"

git push
echo "推送文件到远程"
echo date + "%H:%M:%S"
echo "--------==>>"

echo "============>>>>end"