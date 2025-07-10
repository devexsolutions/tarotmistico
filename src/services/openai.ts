const OPENAI_API_KEY =
  import.meta.env.VITE_OPENAI_API_KEY || import.meta.env.OPENAI_API_KEY;

export interface TarotCard {
  name: string;
  position: string;
  reversed: boolean;
}

export interface OpenAIResponse {
  cards: {
    name: string;
    position: string;
    reversed: boolean;
    meaning: string;
  }[];
  interpretation: string;
}

export async function generateTarotReading(
  question: string,
  spreadType: 'single' | 'three-card' | 'celtic-cross'
): Promise<OpenAIResponse> {
  if (!OPENAI_API_KEY || OPENAI_API_KEY === 'your_openai_api_key_here') {
    throw new Error('Por favor, configura tu API key de OpenAI en el archivo .env');
  }

  const cards = generateCardSpread(spreadType);
  const prompt = createTarotPrompt(question, cards, spreadType);

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'Eres un experto tarotista con décadas de experiencia. Proporciona interpretaciones profundas, intuitivas y útiles del tarot en español de España. Tus lecturas son místicas pero prácticas, ofreciendo orientación real para la vida del consultante.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 1500,
        temperature: 0.8
      })
    });

    if (!response.ok) {
      throw new Error(`Error de OpenAI: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    return parseAIResponse(aiResponse, cards);
  } catch (error) {
    console.error('Error al generar lectura con OpenAI:', error);
    throw new Error('No se pudo generar la lectura. Por favor, inténtalo de nuevo.');
  }
}

function generateCardSpread(spreadType: 'single' | 'three-card' | 'celtic-cross'): TarotCard[] {
  const tarotDeck = [
    'El Loco', 'El Mago', 'La Suma Sacerdotisa', 'La Emperatriz', 'El Emperador',
    'El Hierofante', 'Los Enamorados', 'El Carro', 'La Fuerza', 'El Ermitaño',
    'La Rueda de la Fortuna', 'La Justicia', 'El Colgado', 'La Muerte', 'La Templanza',
    'El Diablo', 'La Torre', 'La Estrella', 'La Luna', 'El Sol', 'El Juicio', 'El Mundo',
    'As de Copas', 'Dos de Copas', 'Tres de Copas', 'Cuatro de Copas', 'Cinco de Copas',
    'Seis de Copas', 'Siete de Copas', 'Ocho de Copas', 'Nueve de Copas', 'Diez de Copas',
    'Sota de Copas', 'Caballero de Copas', 'Reina de Copas', 'Rey de Copas',
    'As de Espadas', 'Dos de Espadas', 'Tres de Espadas', 'Cuatro de Espadas', 'Cinco de Espadas',
    'Seis de Espadas', 'Siete de Espadas', 'Ocho de Espadas', 'Nueve de Espadas', 'Diez de Espadas',
    'Sota de Espadas', 'Caballero de Espadas', 'Reina de Espadas', 'Rey de Espadas',
    'As de Bastos', 'Dos de Bastos', 'Tres de Bastos', 'Cuatro de Bastos', 'Cinco de Bastos',
    'Seis de Bastos', 'Siete de Bastos', 'Ocho de Bastos', 'Nueve de Bastos', 'Diez de Bastos',
    'Sota de Bastos', 'Caballero de Bastos', 'Reina de Bastos', 'Rey de Bastos',
    'As de Oros', 'Dos de Oros', 'Tres de Oros', 'Cuatro de Oros', 'Cinco de Oros',
    'Seis de Oros', 'Siete de Oros', 'Ocho de Oros', 'Nueve de Oros', 'Diez de Oros',
    'Sota de Oros', 'Caballero de Oros', 'Reina de Oros', 'Rey de Oros'
  ];

  const shuffled = [...tarotDeck].sort(() => Math.random() - 0.5);
  const cards: TarotCard[] = [];

  const positions = getPositionsForSpread(spreadType);

  for (let i = 0; i < positions.length; i++) {
    cards.push({
      name: shuffled[i],
      position: positions[i],
      reversed: Math.random() < 0.25 // 25% probabilidad de carta invertida
    });
  }

  return cards;
}

function getPositionsForSpread(spreadType: 'single' | 'three-card' | 'celtic-cross'): string[] {
  switch (spreadType) {
    case 'single':
      return ['Orientación'];
    case 'three-card':
      return ['Pasado', 'Presente', 'Futuro'];
    case 'celtic-cross':
      return [
        'Situación Presente',
        'Desafío/Cruz',
        'Pasado Lejano/Fundación',
        'Pasado Reciente',
        'Resultado Posible',
        'Futuro Inmediato',
        'Tu Enfoque',
        'Influencias Externas',
        'Esperanzas y Miedos',
        'Resultado Final'
      ];
    default:
      return ['Orientación'];
  }
}

function createTarotPrompt(question: string, cards: TarotCard[], spreadType: string): string {
  const spreadInfo = {
    'single': 'una carta para orientación directa',
    'three-card': 'tres cartas representando pasado, presente y futuro',
    'celtic-cross': 'diez cartas en la tirada de Cruz Céltica para un análisis completo'
  };

  let cardsList = cards.map(card => 
    `- ${card.name} ${card.reversed ? '(Invertida)' : '(Derecha)'} en posición "${card.position}"`
  ).join('\n');

  return `
Pregunta del consultante: "${question}"

Tirada realizada: ${spreadInfo[spreadType]}

Cartas obtenidas:
${cardsList}

Por favor, proporciona una lectura completa que incluya:

1. **Significado individual de cada carta** en su posición específica, considerando si está derecha o invertida
2. **Interpretación general** que conecte todas las cartas con la pregunta del consultante
3. **Consejos prácticos** basados en la lectura
4. **Mensaje final** inspirador y orientativo

Formato de respuesta:
CARTAS:
[Para cada carta: nombre, posición, significado específico]

INTERPRETACIÓN:
[Análisis completo conectando todas las cartas con la pregunta]

Usa un tono místico pero accesible, en español de España, y proporciona orientación práctica y esperanzadora.
`;
}

function parseAIResponse(aiResponse: string, originalCards: TarotCard[]): OpenAIResponse {
  const lines = aiResponse.split('\n');
  const cards = originalCards.map((card, index) => ({
    ...card,
    meaning: extractCardMeaning(aiResponse, card.name, index)
  }));

  const interpretationStart = aiResponse.indexOf('INTERPRETACIÓN:');
  const interpretation = interpretationStart !== -1 
    ? aiResponse.substring(interpretationStart + 'INTERPRETACIÓN:'.length).trim()
    : aiResponse;

  return {
    cards,
    interpretation: interpretation || aiResponse
  };
}

function extractCardMeaning(response: string, cardName: string, index: number): string {
  // Buscar el significado específico de la carta en la respuesta
  const cardSection = response.match(new RegExp(`${cardName}[^\\n]*\\n([^\\n-]+)`, 'i'));
  if (cardSection) {
    return cardSection[1].trim();
  }

  // Fallback: extraer una parte relevante de la respuesta
  const sentences = response.split(/[.!?]+/);
  const relevantSentence = sentences.find(sentence => 
    sentence.toLowerCase().includes(cardName.toLowerCase())
  );

  return relevantSentence?.trim() || 'Una carta poderosa que aporta sabiduría a tu consulta.';
}

export async function generatePalmReading(imageDataUrl: string): Promise<string> {
  if (!OPENAI_API_KEY || OPENAI_API_KEY === 'your_openai_api_key_here') {
    throw new Error('Por favor, configura tu API key de OpenAI en el archivo .env');
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4-vision-preview',
        messages: [
          {
            role: 'system',
            content: 'Eres un maestro quiromante. Analiza la imagen de la palma y ofrece una lectura detallada en espa\u00f1ol.'
          },
          {
            role: 'user',
            content: [
              { type: 'text', text: 'Interpreta las l\u00edneas y monta un mensaje orientativo.' },
              { type: 'image_url', image_url: { url: imageDataUrl } }
            ] as any
          }
        ],
        max_tokens: 1000,
        temperature: 0.8
      })
    });

    if (!response.ok) {
      throw new Error(`Error de OpenAI: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content as string;
  } catch (error) {
    console.error('Error al generar lectura de mano:', error);
    throw new Error('No se pudo generar la lectura de la mano. Int\u00e9ntalo de nuevo.');
  }
}