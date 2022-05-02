#!/usr/bin/env bash

root_user_name="root"
root_pswd="root"
package="mariadb";


function install_mysql(){
  sudo pacman -Sy mariadb
  #send "O"
  sudo rm -Rf /var/lib/mysql/*
  sudo mysql_install_db --user=mysql --basedir=/usr --datadir=/var/lib/mysql
  sudo systemctl enable mariadb.service
  sudo systemctl start mariadb.service

  sudo mysql <<EOFMYSQL
    DROP USER 'root'@'localhost';
    CREATE USER $root@'localhost' IDENTIFIED BY $root_pswd;
    GRANT ALL PRIVILEGES ON *.* TO 'root'@'localhost' WITH GRANT OPTION;
    FLUSH PRIVILEGES;
    quit
EOFMYSQL

  #sudo mysql --user root
}

function check_mysql_install(){
  check="$(sudo pacman -Qs --color always "${package}" | grep "local" | grep "${package} ")";
  if [ -n "${check}" ] ; then
      echo "${package} is installed";
  elif [ -z "${check}" ] ; then
      echo "${package} is NOT installed";
      echo "Installing mariadb sql"
      install_mysql
  fi;
}

install_mysql



