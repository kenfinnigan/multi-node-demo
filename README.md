# Demo steps

## Create Kind cluster

```bash
kind create cluster --config ./kind/kind-config.yml
```

## Python service

### Build Python image

```bash
docker build -t kenf/python-service:1.0.0-SNAPSHOT .
```

### Push Python service image to registry in Kind

```bash
kind load docker-image kenf/python-service:1.0.0-SNAPSHOT
```

## Node service

### Build Node image

```bash
docker build -t kenf/node-service:1.0.0-SNAPSHOT .
docker build -t kenf/another-node-service:1.0.0-SNAPSHOT .
```

### Push Node service image to registry in Kind

```bash
kind load docker-image kenf/node-service:1.0.0-SNAPSHOT
kind load docker-image kenf/another-node-service:1.0.0-SNAPSHOT
```

## Verify the images are present

```bash
docker exec -it kind-control-plane crictl images

IMAGE                                      TAG                  IMAGE ID            SIZE
docker.io/kenf/another-node-service        1.0.0-SNAPSHOT       8dfa4183c88a1       185MB
docker.io/kenf/node-service                1.0.0-SNAPSHOT       46494d24c4556       185MB
docker.io/kenf/python-service              1.0.0-SNAPSHOT       4851f3dbb9e6c       163MB
```

## Deploy the services

```bash
kubectl create namespace webinar
kubectl apply -f ./k8s -n webinar
```

## Verify the pods/services are running

```bash
kubectl get pods -n webinar
kubectl get service -n webinar
```

## Execute requests

### Success

```bash
curl -d '{"sender": "Ken", "msg": "Here is a message"}' -H "Content-Type: application/json" -X POST http://localhost:3000/processMessage
```

Longer execution time:

```bash
curl -d '{"sender": "Ken", "msg": "Here is a really long message, which will take more time to process in the Python service"}' -H "Content-Type: application/json" -X POST http://localhost:3000/processMessage
```

### Failure

```bash
curl -d '{"sender": "Ken", "msg": "This will fail in downstream service"}' -H "Content-Type: application/json" -X POST http://localhost:3000/processMessage
```

```bash
curl -d '{"msg": "This will fail in Node service"}' -H "Content-Type: application/json" -X POST http://localhost:3000/processMessage
```

## Remove the cluster

```bash
kind delete cluster
```
