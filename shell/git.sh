#! /bin/sh

echo -n "分支名称: $@"
msg=$1
echo $0
echo $1
echo "================"
if [ -n "${msg}" ]; then
    cd $0 && ls
    git add .
    git commit -m "${msg}"
    git pull
    # git status
    git push
    echo "本地提交完成"
else
    "添加注释"
fi

echo "============>>>>end"