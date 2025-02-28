import { randomUUID } from "crypto"; //Método randomUUID retorna um id unico universal aleatorio

export class DatabaseMemory {
    #videos = new Map(); //Map em javascript: conjunto de valores no formato [chave, dados]

    list() {
        //##videos.entries() retorna um objeto iteravel com os item do Map [chave, dados] divido em subarrays
        //.map retorna um objeto iteravel onde [chave, dados] estão no mesmo array, ao inves de sub arrays
        //Array.from retorna um array de um objeto iteravel
        return Array.from(this.#videos.entries()).map((videoArray) => {
            const id = videoArray[0];
            const data = videoArray[1];

            return {
                id,
                ...data
            }
        });
        //Esse formato é importante para uso do Id em requisições
    }

    create(video) {
        const videoId = randomUUID();

        this.#videos.set(videoId, video);
    }

    uptade(id, video) {
        this.#videos.set(id, video);
    }

    delete(id, video) {
        this.#videos.delete(id, video);
    }
}