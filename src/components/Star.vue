<template>
  <div class="star-list">
    <span v-for="(star, index) in stars" :class="`icon-${star}`" :key="index" class="iconfont" @click="handleClickStar(index)"></span>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps, ref, Ref, defineEmits, watchEffect } from 'vue'

// 定义props
const props = defineProps({
  size: {
    type: [String, Number],
    default: 16
  },
  score: {
    type: [String, Number],
    required: true
  },
  theme: {
    type: String,
    default: 'star',
    validator (value: string) {
      // 这个值必须匹配下列字符串中的一个
      return ['star', 'love'].includes(value)
    }
  },
  fill: {
    type: Boolean,
    default: false
  },
  activeColor: {
    type: String,
    default: 'orange'
  },
  defaultColor: {
    type: String,
    default: '#000'
  },
  gap: {
    type: [String, Number],
    default: 2
  }
})

const emit = defineEmits(['change'])

const { stars, activeColor, defaultColor, size, gap, handleClickStar } = useStar()

// 定义一个use函数
function useStar () {
  const TOTAL = 5
  type StarList = Array<string>;
  const stars: Ref<StarList> = ref([])

  watchEffect(() => {
    // 先清空stars
    stars.value = []
    // 定义处理过的分数
    const computedScore = computed(() => {
      const score = +props.score || 0
      return Math.floor(score * 2) / 2
    })

    // 整数部分
    const computedIntegerScore = computed(() => {
      const score = String(computedScore.value)
      return parseInt(score)
    })

    // 小数部分
    const computedDecimalScore = computed(() => {
      return computedScore.value - computedIntegerScore.value
    })

    const push = (score: number, theme: string) => {
      score = score > TOTAL ? TOTAL : score
      while (score--) {
        stars.value.push(theme)
      }
    }

    const fill = props.fill ? '-fill' : ''

    // 将整数星星添加到stars
    push(computedIntegerScore.value, `${props.theme}${fill} active`)

    // 半星添加到stars
    if (computedDecimalScore.value && stars.value.length < TOTAL) {
      push(1, `${props.theme}-half`)
    }

    // 如果不足TOTAL，则填充默认星星
    if (stars.value.length < TOTAL) {
      push(TOTAL - stars.value.length, `${props.theme}${fill}`)
    }
  })

  const handleClickStar = (index: number) => {
    emit('change', index + 1)
  }

  return {
    stars,
    activeColor: props.activeColor,
    defaultColor: props.defaultColor,
    size: `${props.size}px`,
    gap: `${props.gap}px`,
    handleClickStar
  }
}
</script>

<style lang="scss" scoped>
@import url('../assets/fonts/iconfont.css');
.star-list {
  display: inline-flex;
  overflow: hidden;
}
.iconfont {
  margin-right: v-bind(gap);
  cursor: pointer;
  &:last-child{
    margin-right: 0;
  }
}

.icon-star-fill {
  font-size: v-bind(size);
  color: v-bind(defaultColor);
  &.active {
    color: v-bind(activeColor);
  }
}

.icon-star {
  font-size: v-bind(size);
  color: v-bind(defaultColor);
  &-half {
    font-size: v-bind(size);
    color: v-bind(defaultColor);
  }
  &.active {
    color: v-bind(activeColor);
  }
}
.icon-love-fill {
  font-size: v-bind(size);
  color: v-bind(defaultColor);
  &.active {
    color: v-bind(activeColor);
  }
}

.icon-love {
  font-size: v-bind(size);
  color: v-bind(defaultColor);
  &-half {
    font-size: v-bind(size);
    color: v-bind(defaultColor);
  }
  &.active {
    color: v-bind(activeColor);
  }
}

</style>
