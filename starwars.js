// Seu javascript aqui :)
import { play } from './music-sem-private.js';
import { AlgarismosArabicosParaRomanos } from './roman.js';
import { restartAnimation } from './restart-animation.js';
const musicConfiguration = {
    audioUrl: 'audio/tema-sw.mp3',
    coverImageUrl: 'imgs/logo.svg',
    title: 'Intro',
    artist: 'John Williams'
}
play(musicConfiguration, document.body);

// Use a Star Wars API: https://swapi.dev/
// para fazer uma requisição assíncrona e:
//  - Pegar a lista de filmes (AJAX) e preencher no HTML
//  - Quando um filme for clicado, exibir sua introdução

const API_ENDPOINT = 'https://swapi.dev/api';

try {
    const resposta = await fetch(`${API_ENDPOINT}/films`);
    const dados = await resposta.json();
    const listaFilmesBruta = dados.results;


    function Filme(titulo, episodio, conteudo) {//funcao construtora
        this.titulo = titulo;
        this.episodio = episodio;
        this.conteudo = conteudo;

        this.getTitulo = () => {
            return this.titulo;
        }
        this.getEpisodio = () => {
            return this.episodio;
        }
        this.getConteudo = () => {
            return this.conteudo;
        }

    }
    let listaFilme = [];
    for (let item of listaFilmesBruta) {
        let filme = new Filme(item.title, item.episode_id, item.opening_crawl);
        listaFilme.push(filme);
    }

    const listaEl = document.querySelector('#filmes>ul');
    listaEl.innerHTML = '';

    listaFilme = listaFilme.sort(function (a, b) { return a.getEpisodio() - b.getEpisodio() });


    //treinar for
    for (let i in listaFilme) {
        let episodio = listaFilme[i].getEpisodio();
        let episodioRomano = AlgarismosArabicosParaRomanos(episodio).padEnd(3, ' ');
        let titulo = listaFilme[i].getTitulo();

        let template = `
              <li>Episode ${episodioRomano} - ${titulo} </li>
            `;
        const filmeEl = document.createRange().createContextualFragment(template);
        filmeEl.querySelector('li').id = `${episodio - 1}`;
        listaEl.appendChild(filmeEl);
    }

    //exercicio 03
    const listaFilmesNaPagina = document.querySelectorAll('#filmes>ul>li');
    for (const filmeEl of listaFilmesNaPagina) {
        filmeEl.addEventListener('click', mostraIntro);
    }

    function mostraIntro(e) {
        const introEL = document.querySelector('.container-introducao');
        introEL.innerHTML = '';
        let el = e.currentTarget;

        let id = el.id;
        console.log(id);
        let episodioRomano = listaFilme[id].getEpisodio();
        let titulo = (listaFilme[id].getTitulo()).toUpperCase();
        let conteudo = listaFilme[id].getConteudo();

        const template = `
            <pre>
                Episode ${episodioRomano}
                ${titulo}
        
                ${conteudo}
            </pre>
                    `;

        const filmeEl = document.createRange().createContextualFragment(template);
        filmeEl.querySelector('pre').classList.add(`introducao`);
        filmeEl.querySelector('pre').classList.add(`introducao-animada`);
        introEL.appendChild(filmeEl);
        restartAnimation(filmeEl);

    }








} catch (erro) {
    console.error(`Erro na requisição Ajax${erro}`);
}
