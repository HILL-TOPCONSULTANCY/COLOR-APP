# Hilltop Consultancy Color Display Application

This is a simple **Node.js web application** that dynamically displays a webpage with a customizable background color. The background color can be set using an environment variable or passed during the **Docker build process** using the `COLOR` build argument.

---

## **📌 Infrastructure Requirements (Before Docker/Kubernetes)**
To run the application manually, you will need to:

1. **Create a virtual machine or cloud instance** (e.g., AWS EC2, Azure VM, GCP Compute Engine)
2. Select an OS image like **Ubuntu 20.04** or **Amazon Linux 2**
3. Choose at least **t2.micro** (1 vCPU, 1GB RAM) for testing
4. Open inbound ports **8080**, or any host port you’ll map
5. SSH into the instance and install required tools:

```sh
sudo yum update && sudo yum install -y git nodejs npm
```

6. Clone the repo and run the app:
```sh
git clone https://github.com/HILL-TOPCONSULTANCY/COLOR-APP.git
cd COLOR-APP
```
7. Install npm dependencies and libraries
```sh
npm install
```

8. To run with default red background:
```sh
npm start
```

9. To customize color (e.g., blue):
```sh
COLOR=blue npm start
```

10. To test and build:
```sh
npm test
```

Access via: `http://localhost:8080`

---

## **📌 Prerequisites for Docker/Kubernetes**
Ensure you have the following installed on your system:
- **Docker** ([Download Docker](https://www.docker.com/get-started))
- **Git** (Optional, for cloning the repository)
- **Kubernetes CLI (`kubectl`)** ([Install kubectl](https://kubernetes.io/docs/tasks/tools/))

---

## **📌 Cloning the Repository**
Clone this repository to your local machine:
```sh
git clone https://github.com/HILL-TOPCONSULTANCY/COLOR-APP.git
cd COLOR-APP
```

---

## **📌 Understanding Port Mapping in Docker**
When running the application using Docker, **the app runs inside the container on port `8080`**. You expose it to the host with:

```sh
docker run -d -p 8081:8080 hilltopconsultancy/color-app:red
```
Access it on your host at:
```
http://localhost:8081
```

---

## **📌 Building Docker Images with Different Colors**
```sh
docker build --no-cache --build-arg COLOR=red -t hilltopconsultancy/color-app:red .
docker build --no-cache --build-arg COLOR=blue -t hilltopconsultancy/color-app:blue .
docker build --no-cache --build-arg COLOR=green -t hilltopconsultancy/color-app:green .
docker build --no-cache --build-arg COLOR=orange -t hilltopconsultancy/color-app:orange .
docker build --no-cache --build-arg COLOR=pink -t hilltopconsultancy/color-app:pink .
```

---

## **📌 Running the Application with Docker**
```sh
docker run -d -p 8081:8080 hilltopconsultancy/color-app:red
docker run -d -p 8082:8080 hilltopconsultancy/color-app:blue
docker run -d -p 8083:8080 hilltopconsultancy/color-app:green
docker run -d -p 8084:8080 hilltopconsultancy/color-app:orange
docker run -d -p 8085:8080 hilltopconsultancy/color-app:pink
```

---

## **📌 Pushing to Docker Hub**
```sh
docker push <UserName>/<Repo>:red
```

---

## **📌 Accessing the Application**
| Color  | URL |
|--------|--------------------------------|
| **Red** | [http://localhost:8081](http://localhost:8081) |
| **Blue** | [http://localhost:8082](http://localhost:8082) |
| **Green** | [http://localhost:8083](http://localhost:8083) |
| **Orange** | [http://localhost:8084](http://localhost:8084) |
| **Pink** | [http://localhost:8085](http://localhost:8085) |

---

## **📌 Deploying to Kubernetes**
To deploy the **red color version** in Kubernetes:

### **1️⃣ Create a ConfigMap for the Red Color**
`color-configmap.yaml`
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: color-config
data:
  COLOR: "red"
```
```sh
kubectl apply -f color-configmap.yaml
```

---

### **2️⃣ Create a Deployment for the Red Version**
`color-deployment.yaml`
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: color-app-red
spec:
  replicas: 2
  selector:
    matchLabels:
      app: color-app-red
  template:
    metadata:
      labels:
        app: color-app-red
    spec:
      containers:
      - name: color-app
        image: hilltopconsultancy/color-app:red
        ports:
        - containerPort: 8080
        envFrom:
        - configMapRef:
            name: color-config
```
```sh
kubectl apply -f color-deployment.yaml
```

---

### **3️⃣ Create a NodePort Service to Expose the Application**
`color-service.yaml`
```yaml
apiVersion: v1
kind: Service
metadata:
  name: color-app-service
spec:
  type: NodePort
  selector:
    app: color-app-red
  ports:
    - protocol: TCP
      port: 8080
      targetPort: 8080
      nodePort: 30080
```
```sh
kubectl apply -f color-service.yaml
```

---

## **📌 Accessing the Kubernetes Deployment**

Access via:
```
http://<NODE_IP>:30080
```

---

## **📌 Viewing Logs**
```sh
kubectl get pods 
kubectl logs -f <POD_NAME>
```

---

## **📌 Scaling the Deployment**
```sh
kubectl scale deployment color-app-red --replicas=5
```

---

## **📌 Deleting the Deployment**
```sh
kubectl delete deployment color-app-red
kubectl delete service color-app-service
kubectl delete configmap color-config
```

---

## **📌 Conclusion**
This guide covers:
- **Manual setup and running on cloud VMs**
- **Running and testing the app using `npm`**
- **Building and running the application with Docker**
- **Deploying versions to Kubernetes with ConfigMaps and NodePorts**
- **Scaling, logging, and managing deployments**

