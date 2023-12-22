<template>
  <div class="flex bg-tennis-secondary mt-2 pb-4 px-4 rounded-md shadow-md">
    <div class="flex-col w-full text-white text-center">
      <h1 class="text-xl font-semibold">Finals</h1>
      <div class="w-full flex justify-center text-sm">
        <!-- round 1 -->
        <div class="w-1/3 m-2 felx-col">
          <div class="w-full felx-col border-2 rounded-md my-2">
            <div class="w-full flex">
              <div class="w-3/4">
                {{ pairs[0].p1 }} <br />
                {{ pairs[0].p2 }}
              </div>
              <input
                type="text"
                class="w-1/4 mx-2 my-1 rounded-md text-black text-center"
              />
            </div>
            <div class="w-full flex">
              <div class="w-3/4">
                {{ pairs[1].p1 }} <br />
                {{ pairs[1].p2 }}
              </div>
              <input
                type="text"
                class="w-1/4 mx-2 my-1 rounded-md text-black text-center"
              />
            </div>
          </div>
          <div class="w-full felx-col border-2 rounded-md my-2">
            <div class="w-full flex">
              <div class="w-3/4">
                {{ pairs[2].p1 }} <br />
                {{ pairs[2].p2 }}
              </div>
              <input
                type="text"
                class="w-1/4 mx-2 my-1 rounded-md text-black text-center"
              />
            </div>
            <div class="w-full flex">
              <div class="w-3/4">
                {{ pairs[3].p1 }} <br />
                {{ pairs[3].p2 }}
              </div>
              <input
                type="text"
                class="w-1/4 mx-2 my-1 rounded-md text-black text-center"
              />
            </div>
          </div>
        </div>
        <!-- round 2 -->
        <div class="w-1/3 mt-12 m-2 felx-col">
          <div class="w-full felx-col border-2 rounded-md my-2">
            <div class="w-full flex">
              <div class="w-3/4">
                {{ pairs[0].p1 }} <br />
                {{ pairs[0].p2 }}
              </div>
              <input
                type="text"
                class="w-1/4 mx-2 my-1 rounded-md text-black text-center"
              />
            </div>
            <div class="w-full flex">
              <div class="w-3/4">
                {{ pairs[1].p1 }} <br />
                {{ pairs[1].p2 }}
              </div>
              <input
                type="text"
                class="w-1/4 mx-2 my-1 rounded-md text-black text-center"
              />
            </div>
          </div>
          <div class="w-full felx-col border-2 rounded-md mt-6 mb-2">
            <div class="w-full flex">
              <div class="w-3/4">
                {{ pairs[2].p1 }} <br />
                {{ pairs[2].p2 }}
              </div>
              <input
                type="text"
                class="w-1/4 mx-2 my-1 rounded-md text-black text-center"
              />
            </div>
            <div class="w-full flex">
              <div class="w-3/4">
                {{ pairs[3].p1 }} <br />
                {{ pairs[3].p2 }}
              </div>
              <input
                type="text"
                class="w-1/4 mx-2 my-1 rounded-md text-black text-center"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const pairs = ref([
  { p1: "AAAA AAA", p2: "BBBB BBB" },
  { p1: "CCCC CCC", p2: "DDDD DDD" },
  { p1: "EEEE EEE", p2: "FFFF FFF" },
  { p1: "GGGG GGG", p2: "HHHH HHH" },
]);
</script>
