<template>
  <div class="account-security">
    <el-card class="security-card">
      <template #header>
        <div class="card-header">
          <span>手机号验证</span>
          <el-tag :type="accountInfo.phone ? 'success' : 'danger'">
            {{ accountInfo.phone ? '已绑定' : '未绑定' }}
          </el-tag>
        </div>
      </template>
      <div class="security-content">
        <div class="security-info">
          <span>当前手机号: {{ encryptedPhone }}</span>
        </div>
        <el-button type="primary" @click="showPhoneDialog = true">
          {{ accountInfo.phone ? '更换手机号' : '绑定手机号' }}
        </el-button>
      </div>
    </el-card>

    <el-card class="security-card">
      <template #header>
        <div class="card-header">
          <span>邮箱验证</span>
          <el-tag :type="accountInfo.email ? 'success' : 'danger'">
            {{ accountInfo.email ? '已绑定' : '未绑定' }}
          </el-tag>
        </div>
      </template>
      <div class="security-content">
        <div class="security-info">
          <span>当前邮箱: {{ encryptedEmail }}</span>
        </div>
        <el-button type="primary" @click="showEmailDialog = true">
          {{ accountInfo.email ? '更换邮箱' : '绑定邮箱' }}
        </el-button>
      </div>
    </el-card>

    <el-card class="security-card">
      <template #header>
        <div class="card-header">
          <span>修改登录密码</span>
        </div>
      </template>
      <div class="security-content">
        <el-button type="primary" @click="showPasswordDialog = true">修改密码</el-button>
      </div>
    </el-card>

    <!-- 手机号绑定/更换对话框 -->
    <el-dialog v-model="showPhoneDialog" :title="accountInfo.phone ? '更换手机号' : '绑定手机号'" width="500px">
      <el-form :model="phoneForm" label-width="100px">
        <el-form-item label="新手机号" required>
          <el-input v-model="phoneForm.phone" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="验证码" required>
          <div class="verify-code">
            <el-input v-model="phoneForm.code" placeholder="请输入验证码" />
            <el-button type="primary" :disabled="codeCountdown > 0" @click="sendPhoneCode">
              {{ codeCountdown > 0 ? `${codeCountdown}秒后重试` : '获取验证码' }}
            </el-button>
          </div>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showPhoneDialog = false">取消</el-button>
        <el-button type="primary" @click="submitPhoneForm">确认</el-button>
      </template>
    </el-dialog>

    <!-- 邮箱绑定/更换对话框 -->
    <el-dialog v-model="showEmailDialog" :title="accountInfo.email ? '更换邮箱' : '绑定邮箱'" width="500px">
      <el-form :model="emailForm" label-width="100px">
        <el-form-item label="新邮箱" required>
          <el-input v-model="emailForm.email" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item label="验证码" required>
          <div class="verify-code">
            <el-input v-model="emailForm.code" placeholder="请输入验证码" />
            <el-button type="primary" :disabled="emailCodeCountdown > 0" @click="sendEmailCode">
              {{ emailCodeCountdown > 0 ? `${emailCodeCountdown}秒后重试` : '获取验证码' }}
            </el-button>
          </div>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showEmailDialog = false">取消</el-button>
        <el-button type="primary" @click="submitEmailForm">确认</el-button>
      </template>
    </el-dialog>

    <!-- 修改密码对话框 -->
    <el-dialog v-model="showPasswordDialog" title="修改密码" width="500px">
      <el-form :model="passwordForm" label-width="100px" :rules="passwordRules" ref="passwordFormRef">
        <el-form-item label="原密码" prop="oldPassword">
          <el-input v-model="passwordForm.oldPassword" type="password" show-password />
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="passwordForm.newPassword" type="password" show-password />
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input v-model="passwordForm.confirmPassword" type="password" show-password />
        </el-form-item>
        <el-form-item label="验证方式" prop="verifyMethod">
          <el-radio-group v-model="passwordForm.verifyMethod">
            <el-radio label="phone">手机验证</el-radio>
            <el-radio label="email">邮箱验证</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="passwordForm.verifyMethod === 'phone'" label="手机验证码" prop="phoneCode">
          <div class="verify-code">
            <el-input v-model="passwordForm.phoneCode" placeholder="请输入验证码" />
            <el-button type="primary" @click="sendPasswordPhoneCode">获取验证码</el-button>
          </div>
        </el-form-item>
        <el-form-item v-if="passwordForm.verifyMethod === 'email'" label="邮箱验证码" prop="emailCode">
          <div class="verify-code">
            <el-input v-model="passwordForm.emailCode" placeholder="请输入验证码" />
            <el-button type="primary" @click="sendPasswordEmailCode">获取验证码</el-button>
          </div>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showPasswordDialog = false">取消</el-button>
        <el-button type="primary" @click="submitPasswordForm">确认修改</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue';
import { ElMessage } from 'element-plus';

const accountInfo = ref({
  phone: '13800138000',
  email: 'teacher@mool.edu'
});

// 手机号相关
const showPhoneDialog = ref(false);
const phoneForm = reactive({
  phone: '',
  code: ''
});
const codeCountdown = ref(0);

// 邮箱相关
const showEmailDialog = ref(false);
const emailForm = reactive({
  email: '',
  code: ''
});
const emailCodeCountdown = ref(0);

// 密码相关
const showPasswordDialog = ref(false);
const passwordForm = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
  verifyMethod: 'phone',
  phoneCode: '',
  emailCode: ''
});

const passwordRules = {
  oldPassword: [
    { required: true, message: '请输入原密码', trigger: 'blur' }
  ],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度在6到20个字符', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请再次输入新密码', trigger: 'blur' },
    { validator: (rule, value, callback) => {
      if (value !== passwordForm.newPassword) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    }, trigger: 'blur' }
  ],
  verifyMethod: [
    { required: true, message: '请选择验证方式', trigger: 'change' }
  ],
  phoneCode: [
    { required: true, message: '请输入手机验证码', trigger: 'blur' }
  ],
  emailCode: [
    { required: true, message: '请输入邮箱验证码', trigger: 'blur' }
  ]
};

const encryptedPhone = computed(() => {
  const phone = accountInfo.value.phone;
  return phone ? `${phone.substring(0, 3)}****${phone.substring(7)}` : '未绑定';
});

const encryptedEmail = computed(() => {
  const email = accountInfo.value.email;
  if (!email) return '未绑定';
  const atIndex = email.indexOf('@');
  if (atIndex < 3) return email;
  return `${email.substring(0, 3)}****${email.substring(atIndex)}`;
});

const sendPhoneCode = () => {
  if (!phoneForm.phone) {
    ElMessage.warning('请输入手机号');
    return;
  }
  // 模拟发送验证码
  codeCountdown.value = 60;
  const timer = setInterval(() => {
    codeCountdown.value--;
    if (codeCountdown.value <= 0) {
      clearInterval(timer);
    }
  }, 1000);
  ElMessage.success('验证码已发送');
};

const sendEmailCode = () => {
  if (!emailForm.email) {
    ElMessage.warning('请输入邮箱');
    return;
  }
  // 模拟发送验证码
  emailCodeCountdown.value = 60;
  const timer = setInterval(() => {
    emailCodeCountdown.value--;
    if (emailCodeCountdown.value <= 0) {
      clearInterval(timer);
    }
  }, 1000);
  ElMessage.success('验证码已发送');
};

const submitPhoneForm = () => {
  if (!phoneForm.phone || !phoneForm.code) {
    ElMessage.warning('请填写完整信息');
    return;
  }
  // 模拟API调用
  accountInfo.value.phone = phoneForm.phone;
  showPhoneDialog.value = false;
  ElMessage.success('手机号绑定成功');
  phoneForm.phone = '';
  phoneForm.code = '';
};

const submitEmailForm = () => {
  if (!emailForm.email || !emailForm.code) {
    ElMessage.warning('请填写完整信息');
    return;
  }
  // 模拟API调用
  accountInfo.value.email = emailForm.email;
  showEmailDialog.value = false;
  ElMessage.success('邮箱绑定成功');
  emailForm.email = '';
  emailForm.code = '';
};

const sendPasswordPhoneCode = () => {
  if (!accountInfo.value.phone) {
    ElMessage.warning('请先绑定手机号');
    return;
  }
  // 模拟发送验证码
  ElMessage.success('验证码已发送到您的手机');
};

const sendPasswordEmailCode = () => {
  if (!accountInfo.value.email) {
    ElMessage.warning('请先绑定邮箱');
    return;
  }
  // 模拟发送验证码
  ElMessage.success('验证码已发送到您的邮箱');
};

const submitPasswordForm = () => {
  // 这里应该验证表单并调用API
  showPasswordDialog.value = false;
  ElMessage.success('密码修改成功');
  // 重置表单
  passwordForm.oldPassword = '';
  passwordForm.newPassword = '';
  passwordForm.confirmPassword = '';
  passwordForm.verifyMethod = 'phone';
  passwordForm.phoneCode = '';
  passwordForm.emailCode = '';
};
</script>

<style scoped>
.account-security {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}


.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.security-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.verify-code {
  display: flex;
  gap: 10px;
}
</style>