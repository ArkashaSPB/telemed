#!/bin/bash

echo "🧹 Очистка кэша Next.js..."

# Останавливаем dev сервер если запущен
pkill -f "next dev"

# Удаляем папку .next (кэш Next.js)
rm -rf .next

# Удаляем node_modules/.cache если есть
rm -rf node_modules/.cache

echo "✅ Кэш очищен!"

echo "🚀 Запускаем dev сервер заново..."

# Запускаем заново
npm run dev