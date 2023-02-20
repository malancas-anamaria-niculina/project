# Deploy using Kubernetes

minikube start
minikube ssh docker pull docker1509/frontendapp-react:latest
kubectl apply -f deploy/service.yaml
kubectl apply -f deploy/deployment.yaml
minikube tunnel
Access app at http://127.0.0.1:3000/dashboard
http://uploadfileapp.com/dashboard

## Configure Minikube ingress
minikube addons enable ingress
minikube addons enable ingress-dns
append <ip> <DNS-path> to /etc/hosts file