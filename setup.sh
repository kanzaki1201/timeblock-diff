#!/usr/bin/env bash
set -e

if ! command -v mkcert &>/dev/null; then
  echo "mkcert not found. Install it first:"
  echo "  sudo pacman -S mkcert    # Arch"
  echo "  brew install mkcert      # macOS"
  exit 1
fi

echo "==> Installing local CA (may need sudo)..."
mkcert -install

echo ""
echo "==> Detecting local IPs..."
IPS=("localhost" "127.0.0.1")
while IFS= read -r ip; do
  IPS+=("$ip")
done < <(ip -4 addr show | grep -oP 'inet \K[\d.]+' | grep -v '127.0.0.1')

echo "   Generating cert for: ${IPS[*]}"

mkdir -p certs
mkcert -cert-file certs/cert.pem -key-file certs/key.pem "${IPS[@]}"

echo ""
echo "==> Done! Certs are in ./certs/"
echo ""
echo "==> IMPORTANT: To use on your phone:"
echo "   1. Copy the root CA to your phone:"
CA_ROOT=$(mkcert -CAROOT)
echo "      ${CA_ROOT}/rootCA.pem"
echo "   2. On Android: Settings > Security > Install certificate"
echo "   3. On iOS: transfer the file, then Settings > Profile > Install"
echo ""
echo "   Start the server with: node serve.js"
