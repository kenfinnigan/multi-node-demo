# Lumigo Operator setup

## Install the operator

```bash
helm repo add lumigo https://lumigo-io.github.io/lumigo-kubernetes-operator && helm install lumigo lumigo/lumigo-operator --namespace lumigo-system --create-namespace --set cluster.name=<YOUR_CLUSTER_NAME>
```

## Create secret with Lumigo token

```bash
kubectl create secret generic --namespace <YOUR_NAMESPACE> lumigo-credentials --from-literal token=<TOKEN>
```

## Create Lumigo custom resource

```bash
echo '{
      "apiVersion": "operator.lumigo.io/v1alpha1",
      "kind": "Lumigo",
      "metadata": {
        "name": "lumigo"
      },
      "spec": {
        "lumigoToken": {
          "secretRef": {
            "name": "lumigo-credentials",
            "key": "token"
          } 
        }
      }
    }' | kubectl apply -f - --namespace <YOUR_NAMESPACE>
```
