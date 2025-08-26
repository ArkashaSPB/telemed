#!/bin/bash
set -e

HOST="188.134.92.8"
PORT="22119"
USER="root"
REMOTE_DIR="/var/www/work"
PM2_NAME="med"   # имя процесса в pm2

echo "🚀 Деплой на ${USER}@${HOST}:${REMOTE_DIR}"

# Копируем проект (не тащим мусор)
rsync -av --delete \
  --exclude='.git' \
  --exclude='node_modules' \
  --exclude='.env' \
  --exclude='.next' \
  --exclude='dist' \
  --exclude='coverage' \
  --exclude='*.log' \
  --rsync-path="mkdir -p ${REMOTE_DIR} && rsync" \
  -e "ssh -p ${PORT}" \
  ./ \
  ${USER}@${HOST}:${REMOTE_DIR}/

# Делаем всё на сервере
ssh -p ${PORT} ${USER}@${HOST} << ENDSSH
  set -e

  REMOTE_DIR="/var/www/work"
  PM2_NAME="myapp"

  export NVM_DIR="\$HOME/.nvm"
  [ -s "\$NVM_DIR/nvm.sh" ] && . "\$NVM_DIR/nvm.sh"

  export PATH="\$PATH:/usr/bin:/bin:/root/.yarn/bin:/root/.config/yarn/global/node_modules/.bin"

  /bin/mkdir -p "\$REMOTE_DIR"
  cd "\$REMOTE_DIR"

  echo "📦 yarn install..."
  yarn install --frozen-lockfile || yarn install

  if grep -q "\"build\"" package.json; then
    echo "🏗  yarn build..."
    yarn build
  fi

  echo "🚦 PM2..."
  if pm2 list | grep -q "\$PM2_NAME"; then
    pm2 restart "\$PM2_NAME"
  else
    pm2 start yarn --name "\$PM2_NAME" -- start
  fi
  pm2 save
ENDSSH


echo "✅ Готово!"
