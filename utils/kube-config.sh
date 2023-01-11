#!/bin/bash
cd /home/$USER
# Install Docker (https://docs.docker.com/engine/install/ubuntu/)
sudo apt-get update
sudo apt-get install -y ca-certificates curl gnupg lsb-release
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
# Manage Docker as a non root user (https://docs.docker.com/engine/install/linux-postinstall/)
# GUEST_START -> Need root priviledge (https://github.com/kubernetes/minikube/issues/10343)
sudo usermod -aG docker $USER
newgrp docker
# Install Conntrack -> GUEST_MISSING_CONNTRACK (https://github.com/manusa/actions-setup-minikube/issues/33)
sudo apt-get install -y conntrack
# Start Docker daemon (https://docs.docker.com/config/daemon/start/)
sudo systemctl start docker #(alternative: sudo service docker start)
# Install kubectl binary with curl on Linux
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
# Validate the binary
curl -LO "https://dl.k8s.io/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl.sha256"
VALIDATE=$(echo "$(cat kubectl.sha256)  kubectl" | sha256sum --check)
if [[ $VALIDATE =~ OK ]]
then
    sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
fi
# Check Kubernetes version
kubectl version --client --output=yaml
# Install Minikube (https://minikube.sigs.k8s.io/docs/start/)
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube
# Install cri-dockerd on the system to use the combination of the None driver, Kubernetes and Docker container runtime 
# -> NOT_FOUND_CRI_DOCKERD (https://github.com/Mirantis/cri-dockerd#build-and-install)
git clone https://github.com/Mirantis/cri-dockerd.git
wget https://storage.googleapis.com/golang/getgo/installer_linux
chmod +x ./installer_linux
./installer_linux
source ~/.bash_profile

cd cri-dockerd
mkdir bin
go build -o bin/cri-dockerd
mkdir -p /usr/local/bin
sudo install -o root -g root -m 0755 bin/cri-dockerd /usr/local/bin/cri-dockerd
sudo cp -a packaging/systemd/* /etc/systemd/system
sudo sed -i -e 's,/usr/bin/cri-dockerd,/usr/local/bin/cri-dockerd,' /etc/systemd/system/cri-docker.service
sudo systemctl daemon-reload
sudo systemctl enable cri-docker.service
sudo systemctl enable --now cri-docker.socket
# Install critcl -> RUNTIME_ENABLE (https://github.com/kubernetes/minikube/issues/14676)
VERSION="v1.25.0"
wget https://github.com/kubernetes-sigs/cri-tools/releases/download/$VERSION/crictl-$VERSION-linux-amd64.tar.gz
sudo tar zxvf crictl-$VERSION-linux-amd64.tar.gz -C /usr/local/bin
rm -f crictl-$VERSION-linux-amd64.tar.gz

sudo minikube start --extra-config=kubeadm.ignore-preflight-errors=NumCPU --force --cpus 1 --driver=none &> /tmp/logs.txt