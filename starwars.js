// Seu javascript aqui :)
import { play } from './music-sem-private.js';
import { AlgarismosArabicosParaRomanos } from './roman.js'
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


    function Filme(titulo, episodio) {//funcao construtora
        this.titulo = titulo;
        this.episodio = episodio;

        this.getTitulo = () => {
            return this.titulo;
        }
        this.getEpisodio = () => {
            return this.episodio;
        }

    }
    let listaFilme = [];
    for (let item of listaFilmesBruta) {
        let filme = new Filme(item.title, item.episode_id);
        listaFilme.push(filme);
    }

    const listaEl = document.querySelector('#filmes>ul');
    listaEl.innerHTML = '';

    listaFilme = listaFilme.sort(function (a, b) { return a.getEpisodio() - b.getEpisodio() });


    //treinar for
    for (let i in listaFilme) {
        let episodio = listaFilme[i].getEpisodio();
        episodio = AlgarismosArabicosParaRomanos(episodio).padEnd(3, ' ');
        let titulo = listaFilme[i].getTitulo();

        let template = `
              <li>Episode ${episodio} - ${titulo} </li>
            `;
        const filemEl = document.createRange().createContextualFragment(template);
        listaEl.appendChild(filemEl);
    }










} catch (erro) {
    console.error(`Erro na requisição Ajax${erro}`);
}
