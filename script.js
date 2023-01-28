const card_holder = document.getElementById('card_holder');
const loading = document.querySelector('.loading');
let limit = 12;
let page = 1;

const getData = async () => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);
    const data = await res.json();
    return data;
}

const showData = async () => {
    const data = await getData();
    data.forEach(item => {
        const card = document.createElement('div');
        const card_id = document.createElement('p');
        card_id.innerText = item.id;
        card.classList.add('card-item');
        card.appendChild(card_id);
        card_holder.appendChild(card);
    });
}

const showLoading = () => {
    loading.classList.add('show');
    setTimeout(() => {
        loading.classList.remove('show');
        setTimeout(() => {
            page++;
            showData();
        }, 300);
    }, 1000);
}

showData();

window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 5) {
        showLoading();
    }
});