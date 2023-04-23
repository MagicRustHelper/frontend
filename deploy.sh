echo "Building app..."
npm run build

echo "Deploying files to server"
scp -r build/*  front@magic.mahryct.ru:/var/www/magic.mahryct.ru/

echo "Done!"