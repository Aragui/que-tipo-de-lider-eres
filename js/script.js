var app = new Vue({
    el: "#app",
    data: {
        preguntas: [],
        lideres: [],
        respuestas: [],
        resultados: {
            a: 0,
            b: 0,
            c: 0,
            d: 0,
            e: 0,
            f: 0
        },
        titulo: "",
        texto: ""
    },
    mounted: async function () {
        try {
            const result = await fetch('./js/preguntas.json');
            const json = await result.json();
            this.preguntas = json;
            const lideres = await fetch('./js/lideres.json');
            const lideresJson = await lideres.json();
            this.lideres = lideresJson;
        } catch {
            alert("Ha ocurrido un error, vuelve a intentarlo");
        }
    },
    methods: {
        mostrarRespuesta: function () {
            this.titulo = "";
            this.texto = "";

            const modal = new bootstrap.Modal(document.querySelector(".modal"), {
                backdrop: true,
                keyboard: true
            });

            if (this.respuestas.length < 6 || this.respuestas.length === 0) {
                this.titulo = 'Advertencia';
                this.texto = 'Tienes que llenar el formulario';
            } else {
                Object.entries(this.respuestas)
                    .sort((a, b) => a[1] - b[1])
                    .forEach(entrie => {
                        this.resultados[entrie[1]] += 1;
                    });
                this.resultados = Object.entries(this.resultados).sort((a, b) => b[1] - a[1]);
                console.log(this.resultados)

                const { titulo, descripcion } = this.lideres.find(lider => lider.valor == this.resultados[0][0]);

                this.titulo = titulo;
                this.texto = descripcion;

                modal.toggle();

                this.resultados = [];
                this.respuestas = {};
            }


        }
    }
})