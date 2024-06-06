<template>
    <div class="projects-section mt-5">
        <div class="row mt-5">
            <div class="col-lg-4 col-md-6 mb-4" v-for="project in projects" :key="project.id">
                <div class="card project-card">
                    <img :src="project.image" class="card-img-top" :alt="project.title">
                    <div class="card-img-overlay project-overlay">
                        <h5 class="card-title text-white">{{ project.title }}</h5>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Projects',
    data() {
        return {
            projects: [
                { id: 1, title: 'Equipped with microphone', image: 'https://scontent-ams4-1.xx.fbcdn.net/v/t39.30808-6/380666210_122130818384008745_5335361783607953619_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=H_UoNBHpz8MQ7kNvgGGoUf8&_nc_ht=scontent-ams4-1.xx&oh=00_AYC0n_WS89hjXYJzi8P3XwuHYysMMRXHiQr4bszGuPgEYg&oe=666781D4' },
                { id: 2, title: 'Latest Technology', image: 'https://scontent-ams2-1.xx.fbcdn.net/v/t39.30808-6/424867174_122172779570008745_8881176378876813862_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_ohc=cCcByNUiKxwQ7kNvgGNaf8y&_nc_ht=scontent-ams2-1.xx&oh=00_AYB0sJKxleypsJdbExesEzLd9tsJMuti6_SM_yu8k8ntWg&oe=66679C6F' },
                { id: 3, title: 'Equipped with speaker', image: 'https://scontent-ams4-1.xx.fbcdn.net/v/t39.30808-6/380666602_122130818300008745_2233412879506891347_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=Qah38CejTAEQ7kNvgGYWv-v&_nc_ht=scontent-ams4-1.xx&oh=00_AYDqN_qmbPsoUKSbdTLU7DIt3pQTe7BTZ7O5PBimFXzJWA&oe=6667877F' },
                { id: 4, title: 'Contact Details', image: 'https://scontent-ams4-1.xx.fbcdn.net/v/t39.30808-6/378987101_122128059032008745_2130203356337564808_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_ohc=aP-JAx5tGp8Q7kNvgHusit5&_nc_ht=scontent-ams4-1.xx&oh=00_AYAq9I_fIhRWGwVyC9oTDGpnHKQly6Pbkl632vIdYdYPsQ&oe=66678460' },
                { id: 5, title: 'Outdoor Projects', image: 'https://scontent-ams2-1.xx.fbcdn.net/v/t39.30808-6/385053944_122137206836008745_2443147265477711679_n.jpg?stp=cp6_dst-jpg&_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=Kzt8kVnmbGwQ7kNvgEU_v6B&_nc_ht=scontent-ams2-1.xx&oh=00_AYA2uwhagr-AJpRjCnT-G2i4O7DOiEmwe3wra1_S1mG8Dg&oe=666793D5' },
                { id: 6, title: 'Benefits', image: 'https://scontent-ams4-1.xx.fbcdn.net/v/t39.30808-6/408300392_122154994244008745_767612605566541888_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=k-rl3NAFzr4Q7kNvgFnQ8Ek&_nc_ht=scontent-ams4-1.xx&oh=00_AYCtjmqYv2hizfXiFG6EZB7TK65O2ophR3Qo7fv9uuK_aQ&oe=66678D03' }
            ]
        };
    }
};
</script>

<style scoped>
.project-card {
    position: relative;
    overflow: hidden;
}

.card-img-top {
    width: 410px;
    height: 400px;
    object-fit: cover;
}

.card-img-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.5);
    opacity: 0;
    transition: opacity 0.3s;
}

.project-card:hover .card-img-overlay {
    opacity: 1;
}
</style>