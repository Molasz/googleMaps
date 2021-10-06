# Ejercicio Teórico 
### 1. Que problemas detectas en la operación y razona la respuesta

El problema que veo es que si los precios de cada "Service" están guardados en "MultimediaContent" la operación no 
podra tener en cuenta futuros cambios de precio o de tarifas que alterasen el resultado de la operación "getTotal()"

Para solucionarlo se debería modificar la manera en que se consultan los precios, ya sea guardando 
el historial de precios o guardando el precio en el momento que el usuario solicita el servicio.
### 2. Propón una solución alternativa que corrija los problemas de la operación.
Veo 2 posibles soluciones:

Si se quiere mover la lógica a una función en el service que devuelva el precio ya calculado
```
class RegisteredUser {
    constructor(services = []) {
        this.services = services;
    }

    getTotal() {
        return this.services.reduce((total, service) => total + service.getPrice()); 
    }
}
```

Añadir 3 funciones al service para recuperar cada precio por separado
```
class RegisteredUser {
    constructor(services = []) {
        this.services = services;
    }

    getTotal() {
        return this.services.reduce((total, service) => {
            const multimediaContent = service.getMultimediaContent();

            if(typeof service === StreamingService) 
                total += service.getStreamingPrice();
            }else if(typeof service === StreamingService) {
                total += service.getDownloadPrice();
            };

            if(typeof multimediaContent == PremiumContent) {
                total += service.getAdditionalFee();
            };

            return total;
        }, 0)

    }
}
```