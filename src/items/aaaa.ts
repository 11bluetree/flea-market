const bbb =  () => {
     aoki(1000, 'aoki9999');
   aoki(5000, 'aoki1');
  console.log(888888);
};

const aoki = (time: number, moji: string) =>
  new Promise(() => {
    setTimeout(() => {
      console.log(moji);
    }, time);
  });

bbb();

// setTimeout を Promise でラップ
const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(() => resolve(2), ms));

// async
async function awaitFunc() {
  console.log(1);
  await wait(3000); // Promise が返ってくるまで awaitで 処理停止
  console.log(2); // 約3秒経過に表示
  await aoki(1000, 'aoki3333');
  console.log(3);
}

// awaitFunc();
