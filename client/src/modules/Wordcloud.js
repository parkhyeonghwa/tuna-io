import React from 'react';
import { TagCloud } from "react-tagcloud";

class Wordcloud extends React.Component {
  constructor(props) {
    super(props);

    // Stopwords inspired from http://geeklad.com/remove-stop-words-in-javascript
    this.stopWords = [
      'a',
      'about',
      'above',
      'across',
      'after',
      'again',
      'against',
      'all',
      'almost',
      'alone',
      'along',
      'already',
      'also',
      'although',
      'always',
      'among',
      'an',
      'and',
      'another',
      'any',
      'anybody',
      'anyone',
      'anything',
      'anywhere',
      'are',
      'area',
      'areas',
      'around',
      'as',
      'ask',
      'asked',
      'asking',
      'asks',
      'at',
      'away',
      'b',
      'back',
      'backed',
      'backing',
      'backs',
      'be',
      'became',
      'because',
      'become',
      'becomes',
      'been',
      'before',
      'began',
      'behind',
      'being',
      'beings',
      'best',
      'better',
      'between',
      'big',
      'both',
      'but',
      'by',
      'c',
      'came',
      'can',
      'cannot',
      'case',
      'cases',
      'certain',
      'certainly',
      'clear',
      'clearly',
      'come',
      'could',
      'd',
      'did',
      'differ',
      'different',
      'differently',
      'do',
      'does',
      'done',
      'down',
      'down',
      'downed',
      'downing',
      'downs',
      'during',
      'e',
      'each',
      'early',
      'either',
      'end',
      'ended',
      'ending',
      'ends',
      'enough',
      'even',
      'evenly',
      'ever',
      'every',
      'everybody',
      'everyone',
      'everything',
      'everywhere',
      'f',
      'face',
      'faces',
      'fact',
      'facts',
      'far',
      'felt',
      'few',
      'find',
      'finds',
      'first',
      'for',
      'four',
      'from',
      'full',
      'fully',
      'further',
      'furthered',
      'furthering',
      'furthers',
      'g',
      'gave',
      'general',
      'generally',
      'get',
      'gets',
      'give',
      'given',
      'gives',
      'go',
      'going',
      'good',
      'goods',
      'got',
      'great',
      'greater',
      'greatest',
      'group',
      'grouped',
      'grouping',
      'groups',
      'h',
      'had',
      'has',
      'have',
      'having',
      'he',
      'her',
      'here',
      'herself',
      'high',
      'high',
      'high',
      'higher',
      'highest',
      'him',
      'himself',
      'his',
      'how',
      'however',
      'i',
      'I',
      'I\'m',
      'if',
      'important',
      'in',
      'interest',
      'interested',
      'interesting',
      'interests',
      'into',
      'is',
      'it',
      'its',
      'itself',
      'j',
      'just',
      'k',
      'keep',
      'keeps',
      'kind',
      'knew',
      'know',
      'known',
      'knows',
      'l',
      'large',
      'largely',
      'last',
      'later',
      'latest',
      'least',
      'less',
      'let',
      'lets',
      'like',
      'likely',
      'long',
      'longer',
      'longest',
      'm',
      'made',
      'make',
      'making',
      'man',
      'many',
      'may',
      'me',
      'member',
      'members',
      'men',
      'might',
      'more',
      'most',
      'mostly',
      'mr',
      'mrs',
      'much',
      'must',
      'my',
      'myself',
      'n',
      'necessary',
      'need',
      'needed',
      'needing',
      'needs',
      'never',
      'new',
      'new',
      'newer',
      'newest',
      'next',
      'no',
      'nobody',
      'non',
      'noone',
      'not',
      'nothing',
      'now',
      'nowhere',
      'number',
      'numbers',
      'o',
      'of',
      'off',
      'often',
      'old',
      'older',
      'oldest',
      'on',
      'once',
      'one',
      'only',
      'open',
      'opened',
      'opening',
      'opens',
      'or',
      'order',
      'ordered',
      'ordering',
      'orders',
      'other',
      'others',
      'our',
      'out',
      'over',
      'p',
      'part',
      'parted',
      'parting',
      'parts',
      'per',
      'perhaps',
      'place',
      'places',
      'point',
      'pointed',
      'pointing',
      'points',
      'possible',
      'present',
      'presented',
      'presenting',
      'presents',
      'problem',
      'problems',
      'put',
      'puts',
      'q',
      'quite',
      'r',
      'rather',
      'really',
      'right',
      'right',
      'room',
      'rooms',
      's',
      'said',
      'same',
      'saw',
      'say',
      'says',
      'second',
      'seconds',
      'see',
      'seem',
      'seemed',
      'seeming',
      'seems',
      'sees',
      'several',
      'shall',
      'she',
      'should',
      'show',
      'showed',
      'showing',
      'shows',
      'side',
      'sides',
      'since',
      'small',
      'smaller',
      'smallest',
      'so',
      'some',
      'somebody',
      'someone',
      'something',
      'somewhere',
      'state',
      'states',
      'still',
      'still',
      'such',
      'sure',
      't',
      'take',
      'taken',
      'than',
      'that',
      'the',
      'their',
      'them',
      'then',
      'there',
      'therefore',
      'these',
      'they',
      'thing',
      'things',
      'think',
      'thinks',
      'this',
      'those',
      'though',
      'thought',
      'thoughts',
      'three',
      'through',
      'thus',
      'to',
      'today',
      'together',
      'too',
      'took',
      'toward',
      'turn',
      'turned',
      'turning',
      'turns',
      'two',
      'u',
      'under',
      'until',
      'up',
      'upon',
      'us',
      'use',
      'used',
      'uses',
      'v',
      'very',
      'w',
      'want',
      'wanted',
      'wanting',
      'wants',
      'was',
      'way',
      'ways',
      'we',
      'well',
      'wells',
      'went',
      'were',
      'what',
      'when',
      'where',
      'whether',
      'which',
      'while',
      'who',
      'whole',
      'whose',
      'why',
      'will',
      'with',
      'within',
      'without',
      'work',
      'worked',
      'working',
      'works',
      'would',
      'x',
      'y',
      'year',
      'yeah',
      'years',
      'yet',
      'you',
      'young',
      'younger',
      'youngest',
      'your',
      'yours',
      'z',
    ];

    this.state = {
      wordCounts: this.transformTranscript(props.transcript, false),
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  // Returns an object for the Tagcloud library
  transformTranscript(transcript, includeStopWords) {
    const counts = {};

    transcript
      // get words from transcript
      .map(obj => obj.word)
      // filter out stoplist words
      .filter(word => (includeStopWords ? true : !this.stopWords.includes(word)))
      // turn into count object
      .forEach((word) => {
        counts[word] = counts[word] ? counts[word] + 1 : 1;
      });

    // Transform into data format that Tagcloud expects
    const data = Object.keys(counts).map(key =>
      ({
        value: key,
        count: counts[key],
      }),
    );

    return data;
  }

  handleInputChange(event) {
    const newWordcloud = this.transformTranscript(this.props.transcript, event.target.checked);
    this.setState({ wordCounts: newWordcloud });
  }

  render() {
    return (
      <div>
        <h3>Word cloud</h3>
        <span>Include common words: </span>
        <input type="checkbox" onChange={this.handleInputChange} />
        <TagCloud
          minSize={15}
          maxSize={40}
          tags={this.state.wordCounts}
        />
      </div>
    );
  }
}

export default Wordcloud;
