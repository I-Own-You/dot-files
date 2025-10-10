# remove alt+tab modal delay to show faster
kwriteconfig5 --file kwinrc --group TabBox --key DelayTime 0
qdbus org.kde.KWin /KWin reconfigure

