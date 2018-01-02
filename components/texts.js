const Line = ({ children, style }) => {
  let customStyle = {
    fontFamily: 'Merriweather',
    ...style
  }

  return (
    <span style={customStyle}>
      { children }
      <style jsx>
      {`
        :global(span) {
          display: inline-block;
        }
      `}
      </style>
    </span>
  )
}

const T = ({ x=0, y=0, r=0, c, s=1, style, children }) => {
  let customStyle = {
    transform: `translate(${x}px, ${y}px) rotate(${r}deg)`,
    fontSize: `${s}em`,
    color: c,
    ...style
  }

  return (
    <span style={customStyle}>
      { children }
    </span>
  )
}

export default [
  
  // Alas, nothing happend.
  <Line>
    <T x="12" y="-12" s="1.2">Alas,</T>
    <T x="-12" y="10">nothing happend.</T>
  </Line>,

  // HK, do you know what love is?
  <Line>
    <T x="12" y="-12">HK,</T>
    <T x="-12" y="10" s=".8">do you know what <b>love</b> is?</T>
  </Line>,

  // Tuturuuuu, Okarin
  <Line>
    <T s=".8">Tuturuuuu,</T>
    <T y="18">Okarin</T>
  </Line>,

  // Cheeki Breeki
  <Line>Cheeki Breeki</Line>,

  // STAIRS???!! noOOOOOOOooooooOOoooOoooo!!!!
  <Line>
    <T x="100">STAIRS???!!</T>
    <br />
    <T x="12" s=".7">noOOOOOOOooooooOOoooOoooo!!!!</T>
  </Line>,

  // If anyone tries to capture me, I'll incinerate their brain.
  <Line>
    If anyone tries to capture me, I'll incinerate their brain.
  </Line>,

  // Git Gud
  <Line>
    Git Gud
  </Line>,

  // YOU DIED
  <Line>
    YOU DIED
  </Line>,

  // hello ^•^/
  <Line>
    hello ^•^/
  </Line>,

  // <3
  <Line>
    &lt;3
  </Line>,

  // 今日は
  <Line>
    今日は
  </Line>,

  // F12
  <Line>
    F12
  </Line>,

  // >del /S /Q C:\\windows\\system32\\
  <Line>
    &gt;del /S /Q C:\\windows\\system32\\
  </Line>,

  // Outdated, destroy society.
  <Line>
    Outdated, destroy society.
  </Line>,

  // We are not retreating, we are advancing in reverse.
  <Line>
    We are not retreating, we are advancing in reverse.
  </Line>,

  // Wololo
  <Line>
    Wololo
  </Line>,

  // durararararararara
  <Line>
    durararararararara
  </Line>,

  // 0xdeadbeef
  <Line>
    0xdeadbeef
  </Line>,

  // >git commit suicide - Thats how you delete a repo.
  <Line>
    >git commit suicide Thats how you delete a repo.
  </Line>,

  // ニャアアアアアアアアアアアア
  <Line>
    ニャアアアアアアアアアアアア
  </Line>,

  // KOTOR > The Movies - my opinion
  <Line>
    KOTOR > The Movies - my opinion
  </Line>,

  // I wonder if I plant you in the ground, if you will grow taller?
  <Line>
    I wonder if I plant you in the ground, if you will grow taller?
  </Line>,

  // Здравствуйте! // Zdravstvuyte!
  <Line>
    Здравствуйте!
  </Line>,

  // Slytherin or Ravenclaw - please, no Hufflepuff
  <Line>
    Slytherin or Ravenclaw - please, no Hufflepuff
  </Line>,

  // IZZZZAAAAAAYYYYYY&#8203;AAAAAAAAAAAA!!!!
  <Line>
    IZZZZAAAAAAYYYYYYAAAAAAAAAAAA!!!!
  </Line>,

  // Clown Prince of Crime
  <Line>
    Clown Prince of Crime
  </Line>,

  // RULES OF NATURE
  <Line>
    RULES OF NATURE
  </Line>,

  // METAL GEAR?!
  <Line>  
    METAL GEAR?!
  </Line>,

  // Chimichangas!
  <Line>
    Chimichangas!
  </Line>,

  // We did it reddit.
  <Line>
    We did it reddit.
  </Line>,

  // This is not meth.
  <Line>
    This is not meth.
  </Line>,

  // Hi. What do you play? - Wow, um. Zelda, Tetris... - ... That's kind of a big question.
  <Line>
    Hi. What do you play? - Wow, um. Zelda, Tetris... - ... That's kind of a big question.
  </Line>,

  // segmentation fault
  <Line>
    segmentation fault
  </Line>,

  // xor rax, rax
  <Line>
    xor rax, rax
  </Line>,

  // Flowers, Butterflies and Dragons.
  <Line>
    Flowers, Butterflies and Dragons.
  </Line>,

  // carry me senpai
  <Line>
    carry me senpai
  </Line>,

  // *nodebleed*
  <Line>*nosebleed*</Line>,

  // shizuo chan ^•^ 
  <Line>
    shizuo chan ^•^
  </Line>,

  // 最高に, 最高に, 最高に君達が大好きだ
  <Line>
    最高に, 最高に, 最高に君達が大好きだ
  </Line>,

  // Click the picture.
  <Line>Click the picture.</Line>
]