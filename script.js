function generateRandomNumbers() {
    const average = parseFloat(document.getElementById('averageInput').value);
    const minRange = parseInt(document.getElementById('minInput').value);
    const maxRange = parseInt(document.getElementById('maxInput').value);
    const count = parseInt(document.getElementById('countInput').value);
    const groups = parseInt(document.getElementById('groupsInput').value);

    if (isNaN(average) || isNaN(minRange) || isNaN(maxRange) || isNaN(count) || isNaN(groups) || count <= 0 || groups <= 0 || minRange >= maxRange) {
        alert("请输入有效的参数！");
        return;
    }

    const container = document.getElementById('randomNumbersContainer');
    container.innerHTML = '';

    for (let g = 0; g < groups; g++) {
        const randomNumbers = [];
        let sum = 0;

        for (let i = 0; i < count - 1; i++) {
            const remainingCount = count - i - 1;
            const targetSumForRemaining = (average * count) - sum;
            const maxPossible = Math.min(maxRange, targetSumForRemaining - minRange * remainingCount);
            const minPossible = Math.max(minRange, targetSumForRemaining - maxRange * remainingCount);

            const num = Math.floor(Math.random() * (maxPossible - minPossible + 1)) + minPossible;
            randomNumbers.push(num);
            sum += num;
        }

        const lastNumber = Math.round(average * count - sum);
        if (lastNumber < minRange || lastNumber > maxRange) {
            alert("计算出的最后一个数不在指定范围内，请调整输入！");
            return;
        }
        randomNumbers.push(lastNumber);

        const groupDiv = document.createElement('div');
        groupDiv.className = 'random-group';
        randomNumbers.forEach(num => {
            const span = document.createElement('span');
            span.textContent = num;
            groupDiv.appendChild(span);
        });
        container.appendChild(groupDiv);
    }
}
