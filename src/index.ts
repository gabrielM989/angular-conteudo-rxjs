import { AsyncSubject, BehaviorSubject, Observable, Observer, ReplaySubject, Subject }  from 'rxjs' 
import { observeNotification } from 'rxjs/internal/Notification'

let obs$: Observable<string> = new Observable<string>((observer: Observer<string>) => {
    observer.next('Gabriel')
    observer.next('Rafaela')
    observer.next('Mariana')
    observer.next('Zeca')

    setTimeout(() => {
        observer.next('Gabriel')
        observer.complete()
    }, 3000)

 /*    observer.complete() */

}) /* O $ é um padrão, para identificar o são Observable */

obs$.subscribe(
    function(value) { /* função de sucesso */
        console.log(`Valor retornado: ${value}`)
    },
    function(err){ /* função de erro */
        console.error('Deu erro!!!')
    },
    function(){ /* função de complete, não precisa de parâmetros */
        console.log("Observable completado!!")
    }

)

let obs2$: Observable<number> = new Observable<number>((observer: Observer<number>) => {
    let i = 0

    let id = setInterval(() =>{
        i++

        if (i < 5) {
            observer.next(i ** 2)
        }else {
            /* observer.error({ 
                error: true,
                message: 'Deu erro cara! Desculpa ai...'
            }) */ /* passando um objeto, com o { } */

            observer.complete()
            clearInterval(id) /* Para ter certeza que esse intervalo irá parar, quando o observer der erro. */
        }

    }, 4000)/* setInterval é executado a cada espaço de tempo, determinado */
}) 

obs2$.subscribe(
    (value) => { /* Função de sucesso, não é obrigatório passar as três funções, exceto a de sucesso, a qual é obrigatória */
        console.log('Sub1', value)
    },
    (err) => { /* Função de erro */
        console.log(err)
    },
    () =>{ 
        console.log('Sub1 Concluído')
    } /* Função de complete */

)

setTimeout(() => {
    obs2$.subscribe(
        (value) => { /* Função de sucesso, não é obrigatório passar as três funções, exceto a de sucesso, a qual é obrigatória */
            console.log('Sub2', value)
        },
        (err) => { /* Função de erro */
            console.log(err)
        },
        () =>{ /* Função de complete */
            console.log('Sub2 Concluído')
        }
    
    )   

}, 3000)

/* O Subjects pode tanto observar quanto ser observado, algo que não acontece no Observable */

/* let sub$: Subject<number> = new Subject<number>() */ /* Quandos os dois métodos são acionados, o sub4 perde o primeiro valor */

/* let sub$: ReplaySubject<number> = new ReplaySubject<number>() */ /* Com o ReplaySubject ele não "perde" os valores como acontece no Subjetc */

/* let sub$: AsyncSubject<number> = new AsyncSubject<number>() */ /* Retornam apenas os últimos valores quando os Observable são acionados*/

let sub$: BehaviorSubject<number> = new BehaviorSubject<number>(958853558) /* Pode passar qualquer valor "aleatório" */
                                                                            /* Ele retorna o valor informado "958853558" de forma instantânea, nos dando um dado "inicial" */

obs2$.subscribe(sub$)

sub$.subscribe(
    (value) => { /* Função de sucesso, não é obrigatório passar as três funções, exceto a de sucesso, a qual é obrigatória */
            console.log('Sub3', value)
        },
        (err) => { /* Função de erro */
            console.log(err)
        },
        () =>{ /* Função de complete */
            console.log('Sub3 Concluído')
        }
    
) 

setTimeout(() => {
sub$.subscribe(
    (value) => { /* Função de sucesso, não é obrigatório passar as três funções, exceto a de sucesso, a qual é obrigatória */
            console.log('Sub4', value)
        },
        (err) => { /* Função de erro */
            console.log(err)
        },
        () =>{ /* Função de complete */
            console.log('Sub4 Concluído')
        }
    
)
}, 3000)