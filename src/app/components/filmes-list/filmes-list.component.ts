import { Component, OnInit } from '@angular/core';
import { Filme } from 'src/app/models/filme.models';
import { FilmesService } from 'src/app/services/filmes.service';

@Component({
  selector: 'app-filmes-list',
  templateUrl: './filmes-list.component.html',
  styleUrls: ['./filmes-list.component.css']
})
export class FilmesListComponent implements OnInit {
  filmes?: Filme[];
  currentFilme?: Filme;
  currentIndex = -1;
  nome = '';

  constructor(private FilmesService: FilmesService) { }

  ngOnInit(): void {
    this.retrieveFilmes();
  }

  retrieveFilmes(): void {
    this.FilmesService.getAll()
      .subscribe(
        data => {
          // this.filmes = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.retrieveFilmes();
    this.currentFilme = undefined;
    this.currentIndex = -1;
  }

  setActiveFilme(filme: Filme, index: number): void {
    this.currentFilme = filme;
    this.currentIndex = index;
  }

  removeAllFilmes(): void {
    this.FilmesService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.refreshList();
        },
        error => {
          console.log(error);
        });
  }

  searchTitle(): void {
    this.FilmesService.findByTitle(this.nome)
      .subscribe(
        data => {
          // this.filmes = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

}