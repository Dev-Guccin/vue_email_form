npm run build
sudo rm /var/www/html/dist -r
sed -i -e "s/\"\/css/\".\/css/g" dist/index.html
sed -i -e "s/\"\/js/\".\/js/g" dist/index.html
cp /home/ghks/vue_email_form/dist /var/www/html/ -r