## [RU] Квантовый Алгоритм Шора – Интерактивный Визуализатор

### О проекте

Веб-приложение реализующее **алгоритм Шора** для факторизации больших целых чисел с использованием эмуляции квантовых вычислений. Приложение позволяет визуально проследить все 7 этапов квантового алгоритма в реальном времени: от подготовки состояния до извлечения множителей классическим методом непрерывных дробей.

### Особенности

#### 1. **Полная 7-Этапная Визуализация**
Интерактивная демонстрация каждой стадии алгоритма Шора:

- **Инициализация:** Подготовка суперпозиции |x⟩ состояний с помощью вентилей Адамара
- **Оракул U_f:** Вычисление функции a^x mod M в квантовом параллелизме
- **Квантовое Преобразование Фурье (КПФ):** Усиление периодических пиков в амплитудах
- **Измерение:** Коллапс квантового состояния в конкретное значение
- **Постобработка:** Экстракция периода методом непрерывных дробей
- **Факторизация:** Вычисление множителей через gcd(a^(r/2)±1, M)

#### 2. **Интерактивные Параметры**
- Выбор числа M для факторизации (от 15 до 10 миллионов)
- Выбор основания a в диапазоне [2, M-1]
- Автоматическая проверка условий алгоритма
- Пошаговое выполнение или полная симуляция

#### 3. **Визуализация Квантовых Состояний**
- Регистры |x⟩ и |y⟩ отображаются как матрица ячеек (32 столбца × динамические строки)
- **Цвет ячейки:** фаза амплитуды 
- **Прозрачность:** вероятность |α|²

#### 4. **Алгоритм Непрерывных Дробей**
Классический метод восстановления периода r из измеренного значения m:
- Разложение дроби m/N в цепную дробь
- Автоматический поиск кандидатов на период
- Проверка условия **r — чётное** 

### Использование

Развернутое приложение доступно на [quantum-shor.vercel.app](https://quantum-shor.vercel.app)

#### Локальный Запуск

```bash
# Клонирование репозитория
git clone <repository-url>
cd quantum-shor

# Установка зависимостей
npm install

# Запуск dev-сервера
npm run dev

# Сборка для продакшена
npm run build
```

## [EN] Quantum Shor Algorithm Visualizer

### Project Overview

This is a full-featured web application implementing **Shor's Algorithm** for factoring large integers using quantum computing. The application allows you to visually trace all 7 stages of the quantum algorithm in real-time: from state preparation through factor extraction via the classical continued fractions method.

**Purpose:** Solve practical tasks from the cryptography, including:
- Factorization of RSA-encrypted numbers
- Period-finding of exponential functions
- Analysis of quantum states at each stage
- Verification of factorization success conditions (even period requirement)

### Features

#### 1. **Complete 7-Stage Visualization**
Interactive demonstration of each stage of Shor's algorithm:

- **Initialization:** Superposition preparation of |x⟩ states using Hadamard gates
- **Oracle U_f:** Computation of a^x mod M in quantum parallelism
- **Quantum Fourier Transform (QFT):** Amplification of periodic peaks in amplitudes
- **Measurement:** Collapse of quantum state to a concrete value
- **Post-processing:** Period extraction via continued fractions method
- **Factorization:** Factor computation through gcd(a^(r/2)±1, M)

#### 2. **Interactive Parameters**
- Selection of M for factorization (15 to 10 million)
- Choice of base a in range [2, M-1]
- Automatic verification of algorithm conditions
- Step-by-step execution or full simulation

#### 3. **Quantum State Visualization**
- Registers |x⟩ and |y⟩ displayed as a cell matrix (32 columns × dynamic rows)
- **Cell color:** amplitude phase (0° → red, 90° → cyan, 180° → green, 270° → purple)
- **Cell opacity:** probability |α|²

#### 4. **Continued Fractions Algorithm**
Classical method to recover period r from measured value m:
- Decomposition of fraction m/N into continued fraction
- Automatic search for period candidates
- Verification of **r is even** condition

### Usage

App instance available at [quantum-shor.vercel.app](https://quantum-shor.vercel.app)

#### Run locally

```bash
# Clone the repository
git clone <repository-url>
cd quantum-shor

# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build
```
