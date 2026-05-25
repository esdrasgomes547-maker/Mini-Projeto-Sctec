# TaskReport Dart

## Sobre
O **TaskReport Dart** é uma aplicação que simula o tratamento de dados inconsistentes provenientes de uma API. O projeto foi desenhado sob a perspectiva de um Engenheiro de Software Sênior para demonstrar a robustez da Programação Orientada a Objetos (POO) em Dart.

## Objetivo
Transformar uma lista de mapas brutos e inconsistentes em objetos tipados, garantindo a integridade dos dados através de sanitização, encapsulamento e polimorfismo.

## Conceitos Aplicados
*   **Encapsulamento**: Uso de campos privados (`_id`) e getters.
*   **Herança (POO)**: Classe base `ItemTrabalho` e classe derivada `Tarefa`.
*   **Polimorfismo**: Sobrescrita de métodos (`exibirResumo`).
*   **Tratamento de Dados**: Sanitização de strings (trim), parsing seguro de moedas e números (null safety).
*   **Coleções**: Uso de `Map`, `Set`, e `List` para processamento eficiente de dados.

## Como Executar
1. Certifique-se de ter o Dart SDK instalado.
2. Execute o comando: `dart run TaskReport.dart`
