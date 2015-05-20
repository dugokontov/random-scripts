imageName=$(date +'%Y%m%d%H%M').jpg
# cur=$(pwd)
cur=$(echo /home/boris/scripts/back-image)
echo $cur
wget http://www.kronplatz.com/_webcam/30/webcam3.jpg -O $cur/$imageName

# export DBUS_SESSION_BUS_ADDRESS environment variable
PID=$(pgrep gnome-session)
export DBUS_SESSION_BUS_ADDRESS=$(grep -z DBUS_SESSION_BUS_ADDRESS /proc/$PID/environ|cut -d= -f2-)

gsettings set org.gnome.desktop.background picture-uri file://$cur/$imageName
