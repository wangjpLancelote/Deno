#! /bin/sh

echo -n "分支名称: $@"
msg = $1;
echo $@
cd $@ && ls
echo "================"
git add .
git commit -m "${msg}"
git pull --rebase
git status
git push
echo "end"