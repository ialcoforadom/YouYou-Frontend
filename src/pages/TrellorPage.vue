<template>
  <div id="app">
    <Header />
    <div class="board">
      {{ cards }}
      <div class="lane">
        <h2 class="lane-tittle">Backlog</h2>
        <Container
          group-name="trello"
          @drag-start="handleDragStart('backlog', $event)"
          @drop="handleDrop('backlog', $event)"
          :get-child-payload="getChildPayload"
          :drop-placeholder="{ className: 'placeholder' }"
        >
          <Draggable v-for="card in cards.backlog" :key="card">
            <Card>
              {{ card.text }}
            </Card>
          </Draggable>
        </Container>
      </div>
      <div class="lane">
        <h2 class="lane-tittle">Desenvolvimento</h2>
        <Container
          group-name="trello"
          @drag-start="handleDragStart('dev', $event)"
          @drop="handleDrop('dev', $event)"
          :get-child-payload="getChildPayload"
          :drop-placeholder="{ className: 'placeholder' }"
        >
          <Draggable v-for="card in cards.dev" :key="card">
            <Card>
              {{ card.text }}
            </Card>
          </Draggable>
        </Container>
      </div>
      <div class="lane">
        <h2 class="lane-tittle">Teste</h2>
        <Container
          group-name="trello"
          @drag-start="handleDragStart('testes', $event)"
          @drop="handleDrop('testes', $event)"
          :get-child-payload="getChildPayload"
          :drop-placeholder="{ className: 'placeholder' }"
        >
          <Draggable v-for="card in cards.testes" :key="card">
            <Card>
              {{ card.text }}
            </Card>
          </Draggable>
        </Container>
      </div>
      <div class="lane">
        <h2 class="lane-tittle">Finalizados</h2>
        <Container
          group-name="trello"
          @drag-start="handleDragStart('fechados', $event)"
          @drop="handleDrop('fechados', $event)"
          :get-child-payload="getChildPayload"
          :drop-placeholder="{ className: 'placeholder' }"
        >
          <Draggable v-for="card in cards.fechados" :key="card">
            <Card>
              {{ card.text }}
            </Card>
          </Draggable>
        </Container>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from 'src/components/Header.vue';
import Card from 'src/components/Card.vue';
import initialCard from 'src/interfaces/initialCard.interface';
import { Container, Draggable } from 'vue3-smooth-dnd';

//let cards = initialCard;

let cards = {
  backlog: initialCard.backlog,
  dev: initialCard.dev,
  testes: initialCard.testes,
  fechados: initialCard.fechados,
};

let draggingCard = {
  lane: '',
  index: -1,
  cardData: {},
};

function handleDragStart(lane, dragResult) {
  var { payload, isSource } = dragResult;
  if (isSource) {
    draggingCard = {
      lane,
      index: payload.index,
      cardData: {
        ...cards[lane][payload.index],
      },
    };
  }
}
function handleDrop(lane, dropResult) {
  var { removedIndex, addedIndex } = dropResult;
  if (lane === draggingCard.lane && removedIndex === addedIndex) {
    console.log('entrou aqui Davi');
    return;
  }
  if (removedIndex !== null) {
    cards[lane].splice(removedIndex, 1);
    console.log('entrou aqui');
    console.log(cards);
  }
  if (addedIndex !== null) {
    cards[lane].splice(addedIndex, 0, draggingCard.cardData);
    cards[lane][0].text = 'dasijdoasijdo';
    console.log('entrou aqui 2');
    console.log(cards);
  }
}

function getChildPayload(index) {
  return {
    index,
  };
}
</script>

<style>
.board {
  display: flex;
  justify-content: flex-start;
  margin: 12px;
  align-items: flex-start;
}
.lane {
  background-color: gray;
  width: 230px;
  border-radius: 8px;
  box-shadow: 0 1px 2px 0 rgba(33, 33, 33, 1);
  margin: 0 8px;
  padding: 0 7px;
}
.lane-tittle {
  margin-bottom: 6px;
  padding: 8px 5px;
  font-size: 15px;
  line-height: normal;
}
.placeholder {
  background-color: rgba(33, 33, 33, 0.88);
  border-radius: 4px;
  transform: scaleY(0.85);
  transform-origin: 0% 0%;
}
</style>
