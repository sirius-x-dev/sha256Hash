const crypto = require('crypto');

class ProofOfWork {
    constructor(nickname = 'sirius') {
        this.nickname = nickname;
    }

    // 计算SHA256哈希
    calculateHash(nonce) {
        const data = this.nickname + nonce;
        return crypto.createHash('sha256').update(data).digest('hex');
    }

    // 挖矿函数
    mine(difficulty) {
        const startTime = Date.now();
        let nonce = 0;
        let hash = '';
        const target = '0'.repeat(difficulty);

        while (true) {
            hash = this.calculateHash(nonce);
            if (hash.startsWith(target)) {
                const endTime = Date.now();
                const timeSpent = (endTime - startTime) / 1000; // 转换为秒
                return {
                    nonce,
                    hash,
                    timeSpent,
                    content: this.nickname + nonce
                };
            }
            nonce++;
        }
    }
}

// 创建POW实例
const pow = new ProofOfWork();

// 寻找以4个0开头的哈希
console.log('\n寻找以4个0开头的哈希...');
const result4 = pow.mine(4);
console.log(`花费时间: ${result4.timeSpent} 秒`);
console.log(`输入内容: ${result4.content}`);
console.log(`哈希结果: ${result4.hash}`);

// 寻找以5个0开头的哈希
console.log('\n寻找以5个0开头的哈希...');
const result5 = pow.mine(5);
console.log(`花费时间: ${result5.timeSpent} 秒`);
console.log(`输入内容: ${result5.content}`);
console.log(`哈希结果: ${result5.hash}`);
