'use strict';

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

const thresholdQuoteChars = 50;
let apiQuotes = [];
let oldQuoteAuthor = '';
let oldQuoteText = '';

async function getQuotesFromAPI() {
  showLoadingSpinner();
  const apiUrl = 'https://type.fit/api/quotes';
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    // console.log(1);
    showNewQuote();
  } catch (error) {
    alert('Fetch error');
  }
}

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
  // console.log('loading');
}

function hideCompleteSpinner() {
  loader.hidden = true;
  quoteContainer.hidden = false;
  // console.log('complete');
}

function showNewQuote() {
  showLoadingSpinner();
  const quote = apiQuotes[Math.trunc(Math.random() * apiQuotes.length)]; //use this for API
  // const quote = localQuotes[Math.trunc(Math.random() * localQuotes.length)]; //use only this for localQuotes

  // check if author is null
  if (!quote.author) {
    authorText.textContent = 'Unknow';
  } else {
    authorText.textContent = quote.author;
  }

  // check if text quote is too long
  if (quote.text.length > thresholdQuoteChars) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }

  hideCompleteSpinner();
  quoteText.textContent = quote.text;
}

function showOldQuote(oldQuoteText) {
  const previousQuoteText = oldQuoteText;
  console.log(oldQuoteText);
}

function tweetQuote() {
  // https://twitter.com/intent/tweet
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
}

// event listeners
newQuoteBtn.addEventListener('click', showNewQuote);
twitterBtn.addEventListener('click', tweetQuote);

// on load
getQuotesFromAPI();
