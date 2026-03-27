import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        quemsomos: resolve(__dirname, 'quemsomos.html'),
        servicos: resolve(__dirname, 'servicos.html'),
        fotos: resolve(__dirname, 'fotos.html'),
        contato: resolve(__dirname, 'contato.html'),
        relatorio: resolve(__dirname, 'relatorio-transparencia.html'),
        chamine: resolve(__dirname, 'servicos/chamine-da-caldeira.html'),
        cozedor: resolve(__dirname, 'servicos/cozedor.html'),
        dutos: resolve(__dirname, 'servicos/dutos-de-ar-da-caldeira.html'),
        estruturas: resolve(__dirname, 'servicos/estruturas-metalicas.html'),
        exaustor: resolve(__dirname, 'servicos/exaustor-da-caldeira.html'),
        moega: resolve(__dirname, 'servicos/moega-de-descarte-de-milho.html'),
        silos: resolve(__dirname, 'servicos/silos-de-armazenamento-de-milho.html'),
        soldas: resolve(__dirname, 'servicos/soldas-especiais.html'),
        tanque: resolve(__dirname, 'servicos/tanque-de-flagmassa.html'),
        teto: resolve(__dirname, 'servicos/teto-cobertura-da-caldeira.html')
      }
    }
  }
});
